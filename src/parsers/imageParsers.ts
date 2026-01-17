import { ImageDBType, SkillsDBType } from "../db/db.pgSchema.js";
import { ImageType } from "../zod/schemas/image.zSchema.js";
import { SkillType } from "../zod/schemas/skill.zSchema.js";

export const parseImage = (data: ImageDBType): ImageType => {
    return {
        ID: data.id,
        Metadata: data.metadata,
        URL: data.url,
        Description: data.description,
    };
};
