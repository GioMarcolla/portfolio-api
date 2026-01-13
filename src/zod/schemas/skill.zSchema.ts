import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
// import { BasicIconSchema } from "./basicIcon.zSchema.js"; // Uncomment if using

export const SkillSchema = z.object({
    id: z.string(),
    Name: z.string(),
    Category: z.enum([
        "Programming",
        "Design",
        "Data Science",
        "DevOps",
        "Soft Skills",
        "Management",
        "Business",
        "Other",
    ]),
    Level: z.union([
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5),
    ]),
    // icon: BasicIconDataSchema.optional(), // Uncomment if icon used
});

export type SkillType = z.infer<typeof SkillSchema>;
export const SkillJsonSchema = z.toJSONSchema(SkillSchema);
