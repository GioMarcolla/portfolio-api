import { db } from "../index.js";
import { BiodataDBSchema } from "../db.pgSchema.js";

const getBiodata = async () => {
    const result = await db.select().from(BiodataDBSchema).limit(1);
    return result;
};

export { getBiodata };
