import { desc, eq } from "drizzle-orm";
import { db } from "../index.js";
import { SkillsDBSchema } from "../db.pgSchema.js";

const getAllSkills = async () => {
    const result = await db
        .select()
        .from(SkillsDBSchema)
        .orderBy(desc(SkillsDBSchema.level));

    return result;
};

const getSkill = async ({ id }: { id: string }) => {
    const result = await db
        .select()
        .from(SkillsDBSchema)
        .where(eq(SkillsDBSchema.id, id))
        .limit(1);

    return result;
};

export { getAllSkills, getSkill };
