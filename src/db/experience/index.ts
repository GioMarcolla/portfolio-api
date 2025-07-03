import { asc, eq } from "drizzle-orm";
import { db } from "../index.js";
import { ExperienceDBSchema } from "../db.pgSchema.js";

const getAllExperience = async () => {
    const result = await db
        .select()
        .from(ExperienceDBSchema)
        .orderBy(asc(ExperienceDBSchema.position));

    return result;
};

const getExperience = async ({ id }: { id: string }) => {
    const result = await db
        .select()
        .from(ExperienceDBSchema)
        .where(eq(ExperienceDBSchema.id, id))
        .limit(1);

    return result;
};

export { getAllExperience, getExperience };
