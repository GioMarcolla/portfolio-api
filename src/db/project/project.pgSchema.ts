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

const ProjectDBSchema = pgTable("project", {
    id: uuid("id").primaryKey().defaultRandom(),
    position: integer("position").unique().notNull(),
    projectName: varchar("project_name", { length: 256 }).notNull(),
    locationCountry: varchar("location_country", { length: 64 }).notNull(),
    locationState: varchar("location_state", { length: 64 }),
    locationCity: varchar("location_city", { length: 64 }),
    jobTitle: varchar("job_title", { length: 256 }).notNull(),
    responsibilities: text("responsibilities").array().notNull(),
    description: text("description").array().notNull(),
    achievements: varchar("achievements", { length: 1024 }),
    dateStartedYear: integer("date_started_year").notNull(),
    dateStartedMonth: integer("date_started_month").notNull(),
    dateStartedDay: integer("date_started_day"),
    dateEndYear: integer("date_end_year"),
    dateEndMonth: integer("date_end_month"),
    dateEndDay: integer("date_end_day"),
    currentProject: boolean("current_project").notNull().default(false),
    ...TimestampsDBSchema,
});

export { ProjectDBSchema };
//Add relations here to prevent TS issues
export type ProjectDBType = typeof ProjectDBSchema.$inferSelect & {
    highlights: {
        position: number;
        image: ImageDBType;
    }[];
};
