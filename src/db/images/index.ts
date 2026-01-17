import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { ImageDBSchema } from "../db.pgSchema.js";

const getAllImages = async () => {
    const result = await db
        .select()
        .from(ImageDBSchema);

    return result;
};

const getImage = async ({ id }: { id: string }) => {
    const result = await db
        .select()
        .from(ImageDBSchema)
        .where(eq(ImageDBSchema.id, id))
        .limit(1);

    return result;
};

export { getAllImages, getImage };
