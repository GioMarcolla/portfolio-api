import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config();

export default defineConfig({
    out: "./src/migrations",
    schema: "./dist/db/db.pgSchema.js",
    breakpoints: false,
    dialect: "postgresql",
    dbCredentials: {
        url: (process.env.DATABASE_URL || "") as string,
    },
});
