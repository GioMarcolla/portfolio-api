import { relations } from "drizzle-orm";
import { ExperienceDBSchema } from "../experience/experience.pgSchema.js";
import { ImageDBSchema } from "../images/image.pgSchema.js";
import { ExperienceImageDBSchema } from "./experience-images.pgSchema.js";

/* EXPERIENCE → IMAGES (N-N) */
export const experienceRelations = relations(
    ExperienceDBSchema,
    ({ many }) => ({
        images: many(ExperienceImageDBSchema),
    })
);

/* IMAGE → EXPERIENCES (N-N) */
export const imageRelations = relations(ImageDBSchema, ({ many }) => ({
    experiences: many(ExperienceImageDBSchema),
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
