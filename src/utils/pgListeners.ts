import { Client } from "pg";
import { cacheManager } from "./cache.js"; // adjust path if needed
import dotenv from "dotenv";
import { logger } from "../server.js";

dotenv.config();

export const startPgListener = async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL_DIRECT,
        // ssl: { rejectUnauthorized: false },
    });

    const connectAndListen = async () => {
        try {
            await client.connect();
            logger.info(
                "👂 Listening to DB notifications on channel 'table_update'"
            );

            client.on("notification", (msg: any) => {
                msg.payload = msg.payload || "";
                if (msg.channel === "table_update") {
                    logger.info(
                        `🔄 DB change detected on table: ${msg.payload}`
                    );
                    cacheManager.invalidate(msg.payload);
                } else {
                    logger.info(
                        `🔄 Received unknown notification: ${msg.payload}`
                    );
                }
            });

            client.on("error", (err: any) => {
                logger.error("❌ PG listener error:", err);
                setTimeout(connectAndListen, 500);
            });

            client.on("end", () => {
                logger.warn("🔌 PG listener disconnected. Reconnecting...");
                setTimeout(connectAndListen, 500);
            });

            await client.query("LISTEN table_update");
        } catch (err) {
            logger.error("❌ Error setting up PG listener:", err);
            setTimeout(connectAndListen, 500);
        }
    };

    await connectAndListen();
};
