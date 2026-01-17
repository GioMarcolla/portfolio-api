import { db } from "../index.js";
import { dbStatusDBSchema, dbStatusDBType } from "./dbStatus.pgSchema.js";

const getDBStatus = async () => {
    const result = await db.select().from(dbStatusDBSchema).limit(1);
    return result[0];
};

const clearTablesUpdated = async () => {
    const result = await db.update(dbStatusDBSchema).set({ tablesUpdated: "" });
};

export { getDBStatus, clearTablesUpdated };
