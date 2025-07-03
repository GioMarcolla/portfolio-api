import { type EducationType } from "../zod/schemas/index.js";
import { cacheManager } from "../utils/cache.js";
import { EducationDBType } from "../db/db.pgSchema.js";
import { getAllEducation } from "../db/index.js";
import { logger } from "../server.js";
import { parseEducation } from "../parsers/educationParsers.js";
import { CustomFastifyInstance } from "../utils/fastifyUtils.js";

export const EducationRoutes = async (fastify: CustomFastifyInstance) => {
    fastify.get(
        "/education",
        {
            schema: {
                response: {
                    200: {
                        type: "array",
                        items: { $ref: "Education#" },
                    },
                },
                tags: ["Education"],
                summary: "Get all education data",
                description:
                    "Fetches all education data from the database and returns it in a structured format.",
            },
        },
        async (): Promise<EducationType[]> => {
            const cached = cacheManager.get<EducationType[]>("education");
            if (cached) return cached;

            try {
                const data: EducationDBType[] = await getAllEducation();
                if (!data) throw Error("Received empty response from DB.");

                const parsedData: EducationType[] = parseEducation(data);
                cacheManager.set("education", parsedData);

                return parsedData;
            } catch (e) {
                logger.error(e);
                return [] as EducationType[];
            }
        }
    );
};
