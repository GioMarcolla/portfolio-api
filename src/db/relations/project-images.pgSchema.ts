import { pgTable, uuid, integer, primaryKey } from "drizzle-orm/pg-core";
import { ImageDBSchema } from "../db.pgSchema.js";
import { ProjectDBSchema } from "../project/project.pgSchema.js";

export const ProjectImageDBSchema = pgTable(
    "project_image",
    {
        projectId: uuid("project_id")
            .notNull()
            .references(() => ProjectDBSchema.id, { onDelete: "cascade" }),

        imageId: uuid("image_id")
            .notNull()
            .references(() => ImageDBSchema.id, { onDelete: "cascade" }),

        position: integer("position").notNull(),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.projectId, t.imageId] }),
    })
);
