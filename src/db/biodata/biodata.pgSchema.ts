import { pgTable, uuid, varchar, integer } from "drizzle-orm/pg-core";
import { TimestampsDBSchema } from "../timestamp.pgSchema";

const BiodataDBSchema = pgTable("biodata", {
    id: uuid("id").primaryKey().defaultRandom(),
    firstName: varchar("first_name", { length: 64 }).notNull(),
    middleName: varchar("middle_name", { length: 64 }),
    lastName: varchar("last_name", { length: 64 }).notNull(),
    nickname: varchar("nickname", { length: 64 }),
    birthYear: integer("birth_year").notNull(),
    birthMonth: integer("birth_month").notNull(),
    birthDay: integer("birth_day"),
    gender: varchar("gender", { length: 16 })
        .notNull()
        .$type<"Male" | "Female">(),
    profession: varchar("profession", { length: 128 }).notNull(),
    nationalities: varchar("nationalities", { length: 256 }).notNull(),
    residentCountry: varchar("resident_country", { length: 64 }).notNull(),
    residentState: varchar("resident_state", { length: 64 }).notNull(),
    residentCity: varchar("resident_city", { length: 64 }).notNull(),
    ...TimestampsDBSchema,
});

export { BiodataDBSchema };
export type BiodataDBType = typeof BiodataDBSchema.$inferSelect;
