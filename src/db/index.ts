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
export * from "./biodata/index";
export * from "./experience/index";
export * from "./skills/index";
export * from "./education/index";
export * from "./dbStatus/index";
export * from "./images/index";
export * from "./project/index";
export * from "./relations/index";
export * from "./relations/experience-images.pgSchema";
export * from "./relations/project-images.pgSchema";
