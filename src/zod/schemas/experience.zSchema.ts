import { z } from "zod";
import { BasicDateSchema } from "./basicDate.zSchema";
import { BasicLocationSchema } from "./basicLocation.zSchema";
import { SkillSchema } from "./skill.zSchema";
import { BasicHighlightsSchema } from "./basicHighlights.zSchema";

export const ExperienceSchema = z.object({
    id: z.string(),
    Position: z.number(),
    CompanyName: z.string(),
    Department: z.string().optional(),
    Team: z.string().optional(),
    Location: BasicLocationSchema,
    JobTitle: z.string(),
    JobType: z.enum(["Contract", "Part-Time", "Full-Time", "Internship"]),
    Level: z
        .enum([
            "intern",
            "Junior",
            "Mid",
            "Senior",
            "Staff",
            "Lead",
            "Manager",
            "Director",
            "VP",
            "Founder",
            "C-Suite",
        ])
        .optional(),
    Description: z.string().array(),
    Responsibilities: z.string().array(),
    Achievements: z.string().optional(),
    DateStarted: BasicDateSchema,
    DateEnd: BasicDateSchema.optional(),
    CurrentJob: z.boolean(),
    Skills: z.array(SkillSchema).optional(),
    Highlights: BasicHighlightsSchema.array().optional(),
});

export type ExperienceType = z.infer<typeof ExperienceSchema>;
export const ExperienceJsonSchema = z.toJSONSchema(ExperienceSchema);
