import { z } from "zod";
import { BasicDateSchema } from "./basicDate.zSchema.js";
import { BasicLocationSchema } from "./basicLocation.zSchema.js";
import zodToJsonSchema from "zod-to-json-schema";

export const EducationSchema = z.object({
    id: z.string(),
    Position: z.number(),
    Institution: z.string(),
    Location: BasicLocationSchema,
    Degree: z.string(),
    DegreeShort: z.string().optional(),
    Major: z.string().optional(),
    Track: z.string().optional(),
    DateStarted: BasicDateSchema,
    DateCompleted: BasicDateSchema.optional(),
    Completed: z.boolean(),

    toString: z.function().returns(z.string()),
});

export type EducationType = z.infer<typeof EducationSchema>;
export const EducationJsonSchema = zodToJsonSchema(EducationSchema, {
    name: "Education",
});