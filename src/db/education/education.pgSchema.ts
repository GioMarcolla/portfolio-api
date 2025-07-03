import { pgTable, uuid, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { TimestampsDBSchema } from "../timestamp.pgSchema.js";

const EducationDBSchema = pgTable("education", {
    id: uuid("id").primaryKey().defaultRandom(),
    position: integer("position").unique().notNull(),
    institution: varchar("institution", { length: 128 }).notNull(),
    locationCountry: varchar("location_country", { length: 64 }).notNull(),
    locationState: varchar("location_state", { length: 64 }).notNull(),
    locationCity: varchar("location_city", { length: 64 }).notNull(),
    degree: varchar("degree", { length: 128 }).notNull(),
    degreeShort: varchar("degree_short", { length: 16 }),
    major: varchar("major", { length: 128 }),
    track: varchar("track", { length: 128 }),
    dateStartedYear: integer("date_started_year").notNull(),
    dateStartedMonth: integer("date_started_month").notNull(),
    dateStartedDay: integer("date_started_day"),
    dateCompletedYear: integer("date_completed_year"),
    dateCompletedMonth: integer("date_completed_month"),
    dateCompletedDay: integer("date_completed_day"),
    completed: boolean("completed").notNull().default(false),
    ...TimestampsDBSchema,
});

export { EducationDBSchema };
export type EducationDBType = typeof EducationDBSchema.$inferSelect;
