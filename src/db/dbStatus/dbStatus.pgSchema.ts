import { pgTable, uuid, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { TimestampsDBSchema } from "../timestamp.pgSchema";

const dbStatusDBSchema = pgTable("db_status", {
    id: uuid("id").primaryKey().defaultRandom(),
    tablesUpdated: varchar("tables_updated", { length: 2048 }),
    ...TimestampsDBSchema,
});

export { dbStatusDBSchema };
export type dbStatusDBType = typeof dbStatusDBSchema.$inferSelect;
