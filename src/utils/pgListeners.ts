import { Client } from "pg";
import { cacheManager } from "./cache.js";
import { logger } from "../server.js";
import dotenv from "dotenv";

dotenv.config();

let client: Client | null = null;
let initialized = false;

export const ensurePgListenerStarted = async () => {
    if (initialized) return;

    logger.info("🚀 Starting PG listener...");

    client = new Client({
        connectionString: process.env.DATABASE_URL_DIRECT,
        ssl: { rejectUnauthorized: false },
    });

    try {
        await client.connect();

        client.on("notification", (msg: any) => {
            const payload = msg.payload || "";
            if (msg.channel === "table_update") {
                logger.info(`🔄 DB change detected on table: ${payload}`);
                cacheManager.invalidate(payload);
            }
        });

        client.on("error", async (err: any) => {
            logger.error("❌ PG listener error:", err);
            await stopPgListener();
        });

        client.on("end", async () => {
            logger.warn("🔌 PG listener disconnected");
            await stopPgListener();
        });

        await client.query("LISTEN table_update");
        initialized = true;
        logger.info("✅ PG listener connected and listening");
    } catch (err) {
        logger.error("❌ Error starting PG listener:", err);
    }
};

export const stopPgListener = async () => {
    if (client) {
        try {
            await client.end();
        } catch (e) {
            logger.warn("⚠️ Error while stopping PG listener:", e);
        }
        client = null;
        initialized = false;
    }
};
