import { ImageDBType, SkillsDBType } from "../db/db.pgSchema";
import { ImageType } from "../zod/schemas/image.zSchema";
import { SkillType } from "../zod/schemas/skill.zSchema";

export const parseImage = (data: ImageDBType): ImageType => {
    return {
        ID: data.id,
        Metadata: data.metadata,
        URL: data.url,
        Description: data.description,
    };
};
