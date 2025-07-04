import { type BiodataType } from "../zod/schemas/index.js";
import { getBiodata } from "../db/index.js";
import { parseBiodata } from "../parsers/index.js";
import { logger } from "../server.js";
import { cacheManager } from "../utils/cache.js";
import { BiodataDBType } from "../db/db.pgSchema.js";
import { CustomFastifyInstance } from "../utils/fastifyUtils.js";

export const getAndParseBiodata = async () => {
    try {
        const data: BiodataDBType[] = await getBiodata();
        if (!data) throw Error("Received empty response from DB.");

        const parsedData: BiodataType = parseBiodata(data[0]);
        return parsedData;
    } catch (e) {
        return logger.error(e);
    }
};

export const BiodataRoutes = async (fastify: CustomFastifyInstance) => {
    fastify.get(
        "/biodata",
        {
            schema: {
                response: {
                    200: { $ref: "Biodata#" },
                },
                tags: ["Biodata"],
                summary: "Get Biodata",
                description:
                    "Fetches the Biodata from the database and returns it in a structured format.",
            },
        },
        async (): Promise<BiodataType> => {
            const cached = await cacheManager.get<BiodataType>(
                "biodata",
                getAndParseBiodata
            );

            return cached;
        }
    );
};
