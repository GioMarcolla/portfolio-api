import { timestamp } from "drizzle-orm/pg-core";

const TimestampsDBSchema = {
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date()),
};

export { TimestampsDBSchema };
