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

    get<T>(key: string): T | null {
        const entry = this.cache[key];
        if (!entry) return null;

        if (Date.now() > entry.expiresAt) {
            delete this.cache[key];
            return null;
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

export const cacheManager = new CacheManager(24 * 60 * 60 * 1000); // 24h default TTL
