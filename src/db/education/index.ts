import { desc, eq } from "drizzle-orm";
import { db } from "../index";
import { EducationDBSchema } from "../db.pgSchema";

const getAllEducation = async () => {
    const result = await db
        .select()
        .from(EducationDBSchema)
        .orderBy(desc(EducationDBSchema.position));

    return result;
};

const getEducation = async ({ id }: { id: string }) => {
    const result = await db
        .select()
        .from(EducationDBSchema)
        .where(eq(EducationDBSchema.id, id))
        .limit(1);

    return result;
};

export { getEducation, getAllEducation };
