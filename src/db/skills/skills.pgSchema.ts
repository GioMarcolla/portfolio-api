import { pgTable, uuid, varchar, integer } from "drizzle-orm/pg-core";
import { TimestampsDBSchema } from "../timestamp.pgSchema.js";

const SkillsDBSchema = pgTable("skills", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 128 }).notNull(),
    category: varchar("category", { length: 128 })
        .notNull()
        .$type<
            | "Programming"
            | "Design"
            | "Data Science"
            | "DevOps"
            | "Soft Skills"
            | "Management"
            | "Business"
            | "Other"
        >(),
    level: integer("level").notNull().$type<1 | 2 | 3 | 4 | 5>(),
    ...TimestampsDBSchema,
});

export { SkillsDBSchema };
export type SkillsDBType = typeof SkillsDBSchema.$inferSelect;
