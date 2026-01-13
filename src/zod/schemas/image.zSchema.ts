import { z } from "zod";

export const ImageSchema = z.object({
    ID: z.string(),
    Metadata: z.string().array(),
    URL: z.string(),
    Description: z.string().max(1024),
});

export type ImageType = z.infer<typeof ImageSchema>;
