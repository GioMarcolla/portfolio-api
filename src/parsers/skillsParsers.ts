import { SkillsDBType } from "../db/db.pgSchema";
import { SkillType } from "../zod/schemas/skill.zSchema";

export const parseSkills = (
    data: SkillsDBType[]
): SkillType[] => {
    return data.map((item) => {
        const data: SkillType = {
            id: item.id,
            Name: item.name,
            Category: item.category,
            Level: item.level
        };

        return data;
    });
};
