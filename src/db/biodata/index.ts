import { db } from "../index";
import { BiodataDBSchema } from "../db.pgSchema";

const getBiodata = async () => {
    const result = await db.select().from(BiodataDBSchema).limit(1);
    const res = await db.execute(`
        SELECT * FROM experience
    `);
    console.log(res);
    return result;
};

export { getBiodata };
