import { pgTable, uuid, integer, primaryKey } from "drizzle-orm/pg-core";
import { ExperienceDBSchema, ImageDBSchema } from "../db.pgSchema.js";

export const ExperienceImageDBSchema = pgTable(
    "experience_image",
    {
        experienceId: uuid("experience_id")
            .notNull()
            .references(() => ExperienceDBSchema.id, { onDelete: "cascade" }),

        imageId: uuid("image_id")
            .notNull()
            .references(() => ImageDBSchema.id, { onDelete: "cascade" }),

        position: integer("position").notNull(),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.experienceId, t.imageId] }),
    })
);
