import { getAllExperience } from "../db/index.js";
import { parseExperience } from "../parsers/index.js";
import { type ExperienceType } from "../zod/schemas/index.js";
import { logger } from "../server.js";
import { ExperienceDBType } from "../db/db.pgSchema.js";
import { cacheManager } from "../utils/cache.js";
import { CustomFastifyInstance } from "../utils/fastifyUtils.js";

export const ExperienceRoutes = async (fastify: CustomFastifyInstance) => {
    fastify.get(
        "/experience",
        {
            schema: {
                response: {
                    200: {
                        type: "array",
                        items: { $ref: "Experience#" },
                    },
                },
                tags: ["Experience"],
                summary: "Get all experience data",
                description:
                    "Fetches all experience data from the database and returns it in a structured format.",
            },
        },
        async (): Promise<ExperienceType[]> => {
            const cached = cacheManager.get<ExperienceType[]>("experience");
            if (cached) return cached;

            try {
                const data: ExperienceDBType[] = await getAllExperience();
                if (!data) throw Error("Received empty response from DB.");

                const parsedData: ExperienceType[] = parseExperience(data);
                cacheManager.set("experience", parsedData);

                return parsedData;
            } catch (e) {
                logger.error(e);
                return [] as ExperienceType[];
            }
        }
    );
};
