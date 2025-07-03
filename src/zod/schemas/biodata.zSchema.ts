import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

import { BasicDateSchema, BasicLocationSchema } from './index.js';

export const BiodataNameSchema = z.object({
    First: z.string(),
    Middle: z.string().optional(),
    Last: z.string(),
});

export const BiodataSchema = z.object({
    Name: BiodataNameSchema,
    Nickname: z.string().optional(),
    Birthdate: BasicDateSchema,
    Gender: z.enum(["Male", "Female"]),
    Profession: z.string(),
    Nationalities: z.array(z.string()),
    ResidentOf: BasicLocationSchema,
});

export type BiodataType = z.infer<typeof BiodataSchema>;
export const BiodataJsonSchema = zodToJsonSchema(BiodataSchema, {
    name: "Biodata",
});

