import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

const db = drizzle(pool);

export { db };
export * from "./biodata/index.js";
export * from "./experience/index.js";
export * from "./skills/index.js";
export * from "./education/index.js";
export * from "./dbStatus/index.js";
export * from "./images/index.js";
export * from "./relations/index.js";
export * from "./relations/experience-images.pgSchema.js";
