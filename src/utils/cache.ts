import { logger } from "../server.js";
import { clearTablesUpdated, getDBStatus } from "../db/dbStatus/index.js"; // your drizzle or pg instance
import { dbStatusDBType } from "../db/db.pgSchema.js";

type CacheEntry<T> = {
    data: T;
    expiresAt: number; // timestamp
};

class CacheManager {
    private cache: Record<string, CacheEntry<any>> = {};
    private defaultTTL: number; // in ms

    constructor(defaultTTLMs: number) {
        this.defaultTTL = defaultTTLMs;
    }

    async get<T>(key: string, getter: () => Promise<T | void>): Promise<T> {
        const entry = this.cache[key];

        if (!entry || Date.now() > entry.expiresAt) {
            const newData = await getter();

            if (newData) {
                if (entry) delete this.cache[key]; // Clear stale data if exists
                this.set(key, newData); // Set new data

                return this.cache[key].data;
            } else {
                logger.error(
                    "Failed to get new data. Using stale data or null!"
                );
            }
        }

        return entry.data;
    }

    set<T>(key: string, data: T, ttlMs?: number): void {
        const expiresAt = Date.now() + (ttlMs ?? this.defaultTTL);
        this.cache[key] = { data, expiresAt };
    }

    invalidate(key: string): void {
        delete this.cache[key];
    }

    invalidateMany(keys: string[]) {
        for (const key of keys) {
            this.invalidate(key);
        }
    }

    clearAll(): void {
        this.cache = {};
    }
}

const cacheManager = new CacheManager(24 * 60 * 60 * 1000); // 24h default TTL

const invalidateCacheIfNeeded = async () => {
    const dbStatus = await getDBStatus();

    if (!dbStatus) {
        logger.warn("DB Status singleton not found!");
        return;
    }

    const { tablesUpdated } = dbStatus;
    if (!tablesUpdated) return;

    const tables = tablesUpdated
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

    if (tables.length === 0) return;

    logger.info(`Invalidating cache for tables: ${tables.join(", ")}`);

    for (const table of tables) {
        cacheManager.invalidate(table);
    }

    clearTablesUpdated()
}

export { cacheManager, invalidateCacheIfNeeded }