import { asc, eq, sql } from "drizzle-orm";
import { db } from "../index";
import { ProjectDBSchema } from "./project.pgSchema";

const getAllProject = async () => {
    const result = await db
        .select({
            project: ProjectDBSchema,
            images: sql<
                {
                    position: number;
                    image: any;
                }[]
            >`(SELECT COALESCE(
                json_agg(
                    json_build_object(
                    'position', pi.position,
                    'image', to_jsonb(i)
                    ) ORDER BY pi.position
                ) FILTER (WHERE i.id IS NOT NULL),
                '[]'::json
            )
            FROM project_image pi
            LEFT JOIN image i ON pi.image_id = i.id
            WHERE pi.project_id = project.id)`,
        })
        .from(ProjectDBSchema)
        .orderBy(asc(ProjectDBSchema.position));

    if (!result) return [];

    return result.map((item) => ({
        ...item.project,
        highlights: item.images,
    }));
};

const getProject = async ({ id }: { id: string }) => {
    const result = await db
        .select({
            project: ProjectDBSchema,
            images: sql<
                {
                    position: number;
                    image: any;
                }[]
            >`(SELECT COALESCE(
                json_agg(
                    json_build_object(
                    'position', pi.position,
                    'image', to_jsonb(i)
                    ) ORDER BY pi.position
                ) FILTER (WHERE i.id IS NOT NULL),
                '[]'::json
            )
            FROM project_image pi
            LEFT JOIN image i ON pi.image_id = i.id
            WHERE pi.project_id = project.id)`,
        })
        .from(ProjectDBSchema)
        .where(eq(ProjectDBSchema.id, id));

    if (!result) return null;

    return {
        ...result[0].project,
        highlights: result[0].images,
    };
};

export { getAllProject, getProject };
