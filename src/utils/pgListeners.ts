import { Client } from "pg";
import { cacheManager } from "./cache.js"; // adjust path if needed
import dotenv from "dotenv";
import { logger } from "../server.js";

dotenv.config();

export const startPgListener = async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL_DIRECT || "",
        ssl: { rejectUnauthorized: false },
    });

    await client.connect();

    client.on("notification", (msg) => {
        if (msg.channel === "table_update" && msg.payload) {
            logger.info(`🔄 DB change detected on table: ${msg.payload}`);
            cacheManager.invalidate(msg.payload); // implement this to clear your in-memory cache
        }
    });

    await client.query("LISTEN table_update");

    logger.info("👂 Listening to DB notifications on channel 'table_update'");
};
