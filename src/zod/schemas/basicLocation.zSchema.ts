import { z } from "zod";

export const BasicLocationSchema = z.object({
    Country: z.string(),
    State: z.string(),
    City: z.string(),
});

export type BasicLocationType = z.infer<typeof BasicLocationSchema>;
