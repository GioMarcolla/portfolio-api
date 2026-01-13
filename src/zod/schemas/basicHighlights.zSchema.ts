import { z } from "zod";
import { ImageSchema } from "./image.zSchema.js";

export const BasicHighlightsSchema = z.object({
    Position: z.number(),
    Image: ImageSchema,
});

export type BasicHighlightsType = z.infer<typeof BasicHighlightsSchema>;
