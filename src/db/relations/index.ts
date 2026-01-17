import { relations } from "drizzle-orm";
import { ExperienceDBSchema } from "../experience/experience.pgSchema.js";
import { ImageDBSchema } from "../images/image.pgSchema.js";
import { ExperienceImageDBSchema } from "./experience-images.pgSchema.js";
import { ProjectImageDBSchema } from "./project-images.pgSchema.js";
import { ProjectDBSchema } from "../project/project.pgSchema.js";

/* EXPERIENCE → IMAGES (N-N) */
export const experienceRelations = relations(
    ExperienceDBSchema,
    ({ many }) => ({
        images: many(ExperienceImageDBSchema),
    })
);

/* PROJECT → IMAGES (N-N) */
export const projectRelations = relations(
    ProjectDBSchema,
    ({ many }) => ({
        images: many(ProjectImageDBSchema),
    })
);

/* IMAGE → EXPERIENCES/PROJECTS (N-N) */
export const imageRelations = relations(ImageDBSchema, ({ many }) => ({
    experiences: many(ExperienceImageDBSchema),
    projects: many(ProjectImageDBSchema),
}));

/* JOIN TABLE → BOTH SIDES */
export const experienceImageRelations = relations(
    ExperienceImageDBSchema,
    ({ one }) => ({
        experience: one(ExperienceDBSchema, {
            fields: [ExperienceImageDBSchema.experienceId],
            references: [ExperienceDBSchema.id],
        }),
        image: one(ImageDBSchema, {
            fields: [ExperienceImageDBSchema.imageId],
            references: [ImageDBSchema.id],
        }),
    })
);

/* JOIN TABLE → BOTH SIDES (PROJECT_IMAGE) */
export const projectImageRelations = relations(
    ProjectImageDBSchema,
    ({ one }) => ({
        project: one(ProjectDBSchema, {
            fields: [ProjectImageDBSchema.projectId],
            references: [ProjectDBSchema.id],
        }),
        image: one(ImageDBSchema, {
            fields: [ProjectImageDBSchema.imageId],
            references: [ImageDBSchema.id],
        }),
    })
);
