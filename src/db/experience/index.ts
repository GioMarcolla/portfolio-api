import { asc, eq, sql } from "drizzle-orm";
import { db } from "../index.js";
import { ExperienceDBSchema } from "../db.pgSchema.js";

const getAllExperience = async () => {
    const result = await db
        .select({
            experience: ExperienceDBSchema,
            images: sql<
                {
                    position: number;
                    image: any;
                }[]
            >`(SELECT COALESCE(
                json_agg(
                    json_build_object(
                    'position', ei.position,
                    'image', to_jsonb(i)
                    ) ORDER BY ei.position
                ) FILTER (WHERE i.id IS NOT NULL),
                '[]'::json
            )
            FROM experience_image ei
            LEFT JOIN image i ON ei.image_id = i.id
            WHERE ei.experience_id = experience.id)`,
        })
        .from(ExperienceDBSchema)
        .orderBy(asc(ExperienceDBSchema.position));

    if (!result) return [];

    return result.map((item) => ({
        ...item.experience,
        highlights: item.images,
    }));
};

const getExperience = async ({ id }: { id: string }) => {
    const result = await db
        .select({
            experience: ExperienceDBSchema,
            images: sql<
                {
                    position: number;
                    image: any;
                }[]
            >`(SELECT COALESCE(
                json_agg(
                    json_build_object(
                    'position', ei.position,
                    'image', to_jsonb(i)
                    ) ORDER BY ei.position
                ) FILTER (WHERE i.id IS NOT NULL),
                '[]'::json
            )
            FROM experience_image ei
            LEFT JOIN image i ON ei.image_id = i.id
            WHERE ei.experience_id = experience.id)`,
        })
        .from(ExperienceDBSchema)
        .where(eq(ExperienceDBSchema.id, id));

    if (!result) return null;

    return {
        ...result[0].experience,
        highlights: result[0].images,
    };
};

export { getAllExperience, getExperience };
