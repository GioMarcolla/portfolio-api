import { Client } from "pg";
import { cacheManager } from "./cache.js"; // adjust path if needed
import dotenv from "dotenv";
import { logger } from "../server.js";

dotenv.config();

export const startPgListener = async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });

    const connectAndListen = async () => {
        try {
            await client.connect();
            console.log(
                "👂 Listening to DB notifications on channel 'table_update'"
            );

            client.on("notification", (msg: any) => {
                if ((msg.channel === "table_update" && msg.payload) || "") {
                    logger.info(
                        `🔄 DB change detected on table: ${msg.payload || ""}`
                    );
                    cacheManager.invalidate(msg.payload);
                }
            });

            client.on("error", (err: any) => {
                logger.error("❌ PG listener error:", err);
                setTimeout(connectAndListen, 3000);
            });

            client.on("end", () => {
                logger.warn("🔌 PG listener disconnected. Reconnecting...");
                setTimeout(connectAndListen, 3000);
            });

            await client.query("LISTEN table_update");
        } catch (err) {
            logger.error("❌ Error setting up PG listener:", err);
            setTimeout(connectAndListen, 3000);
        }
    };

    await connectAndListen();
};
