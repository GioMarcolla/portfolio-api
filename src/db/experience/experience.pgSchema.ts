import {
    pgTable,
    uuid,
    varchar,
    integer,
    boolean,
    text,
} from "drizzle-orm/pg-core";
import { TimestampsDBSchema } from "../timestamp.pgSchema";
import { ImageDBType } from "../db.pgSchema";

const ExperienceDBSchema = pgTable("experience", {
    id: uuid("id").primaryKey().defaultRandom(),
    position: integer("position").unique().notNull(),
    companyName: varchar("company_name", { length: 256 }).notNull(),
    department: varchar("department", { length: 256 }),
    team: varchar("team", { length: 256 }),
    locationCountry: varchar("location_country", { length: 64 }).notNull(),
    locationState: varchar("location_state", { length: 64 }),
    locationCity: varchar("location_city", { length: 64 }),
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
    responsibilities: text("responsibilities").array().notNull(),
    description: text("description").array().notNull(),
    achievements: varchar("achievements", { length: 1024 }),
    dateStartedYear: integer("date_started_year").notNull(),
    dateStartedMonth: integer("date_started_month").notNull(),
    dateStartedDay: integer("date_started_day"),
    dateEndYear: integer("date_end_year"),
    dateEndMonth: integer("date_end_month"),
    dateEndDay: integer("date_end_day"),
    currentJob: boolean("current_job").notNull().default(false),
    ...TimestampsDBSchema,
});

export { ExperienceDBSchema };
//Add relations here to prevent TS issues
export type ExperienceDBType = typeof ExperienceDBSchema.$inferSelect & {
    highlights: {
        position: number;
        image: ImageDBType;
    }[];
};
