import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";
import { TimestampsDBSchema } from "../timestamp.pgSchema.js";

const ImageDBSchema = pgTable("image", {
    id: uuid("id").primaryKey().defaultRandom(),
    metadata: text("metadata").array().notNull(),
    url: varchar("url", { length: 2048 }).notNull(),
    description: varchar("description", { length: 512 }).notNull(),
    ...TimestampsDBSchema,
});

export { ImageDBSchema };
export type ImageDBType = typeof ImageDBSchema.$inferSelect;


