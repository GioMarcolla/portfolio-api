import { pgTable, uuid, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { TimestampsDBSchema } from "../timestamp.pgSchema.js";

const ExperienceDBSchema = pgTable("experience", {
    id: uuid("id").primaryKey().defaultRandom(),
    position: integer("position").unique().notNull(),
    companyName: varchar("company_name", { length: 256 }).notNull(),
    department: varchar("department", { length: 256 }),
    team: varchar("team", { length: 256 }),
    locationCountry: varchar("location_country", { length: 64 }).notNull(),
    locationState: varchar("location_state", { length: 64 }).notNull(),
    locationCity: varchar("location_city", { length: 64 }).notNull(),
    jobTitle: varchar("job_title", { length: 256 }).notNull(),
    jobType: varchar("job_type", { length: 16 })
        .notNull()
        .$type<"Contract" | "Part-Time" | "Full-Time" | "Internship">(),
    level: varchar("level", { length: 16 }).$type<
        | "intern"
        | "Junior"
        | "Mid"
        | "Senior"
        | "Staff"
        | "Lead"
        | "Manager"
        | "Director"
        | "VP"
        | "Founder"
        | "C-Suite"
    >(),
    responsibilities: varchar("responsibilities", { length: 1024 }).notNull(),
    description: varchar("description", { length: 4096 }).notNull(),
    achievements: varchar("achievements", { length: 1024 }),
    dateStartedYear: integer("date_started_year").notNull(),
    dateStartedMonth: integer("date_started_month").notNull(),
    dateStartedDay: integer("date_started_day"),
    dateEndYear: integer("date_end_year").notNull(),
    dateEndMonth: integer("date_end_month").notNull(),
    dateEndDay: integer("date_end_day"),
    currentJob: boolean("current_job").notNull().default(false),
    ...TimestampsDBSchema,
});

export { ExperienceDBSchema };
export type ExperienceDBType = typeof ExperienceDBSchema.$inferSelect;
