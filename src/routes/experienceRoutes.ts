import { getAllExperience } from "../db/index";
import { parseExperience } from "../parsers/index";
import { type ExperienceType } from "../zod/schemas/index";
import { logger } from "../server";
import { ExperienceDBType } from "../db/db.pgSchema";
import { cacheManager } from "../utils/cache";
import { CustomFastifyInstance } from "../utils/fastifyUtils";

export const getAndParseExperience = async () => {
    try {
        const data: ExperienceDBType[] = await getAllExperience();
        if (!data) throw Error("Received empty response from DB.");

        const parsedData: ExperienceType[] = parseExperience(data);
        return parsedData;
    } catch (e) {
        return logger.error(e);
    }
};

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
            const cached = await cacheManager.get<ExperienceType[]>(
                "experience",
                getAndParseExperience
            );
            return cached;
        }
    );
};
