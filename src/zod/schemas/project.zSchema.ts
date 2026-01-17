import { z } from "zod";
import { BasicDateSchema } from "./basicDate.zSchema";
import { BasicLocationSchema } from "./basicLocation.zSchema";
import { SkillSchema } from "./skill.zSchema";
import { BasicHighlightsSchema } from "./basicHighlights.zSchema";

export const ProjectSchema = z.object({
    id: z.string(),
    Position: z.number(),
    ProjectName: z.string(),
    Location: BasicLocationSchema,
    JobTitle: z.string(),
    Description: z.string().array(),
    Responsibilities: z.string().array(),
    Achievements: z.string().optional(),
    DateStarted: BasicDateSchema,
    DateEnd: BasicDateSchema.optional(),
    CurrentProject: z.boolean(),
    Skills: z.array(SkillSchema).optional(),
    Highlights: BasicHighlightsSchema.array().optional(),
});

export type ProjectType = z.infer<typeof ProjectSchema>;
export const ProjectJsonSchema = z.toJSONSchema(ProjectSchema);
