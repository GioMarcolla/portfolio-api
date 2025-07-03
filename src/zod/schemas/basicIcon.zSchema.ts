import { z } from "zod";

export const BasicIconSchema = z.object({
    id: z.string(),
    name: z.string(),
    light: z.string(),
    dark: z.string().optional(),
});

export type BasicIconType = z.infer<typeof BasicIconSchema>;
