import { getAllSkills } from "../db/index.js";
import { type SkillType } from "../zod/schemas/index.js";
import { cacheManager } from "../utils/cache.js";
import { parseSkills } from "../parsers/skillsParsers.js";
import { SkillsDBType } from "../db/db.pgSchema.js";
import { CustomFastifyInstance } from "../utils/fastifyUtils.js";

export const getAndParseSkills = async () => {
    try {
        const data: SkillsDBType[] = await getAllSkills();
        if (!data) throw Error("Received empty response from DB.");

        const parsedData: SkillType[] = parseSkills(data);
        return parsedData;
    } catch (e) {
        return console.error(e);
    }
};

export const SkillsRoutes = async (fastify: CustomFastifyInstance) => {
    fastify.get(
        "/skills",
        {
            schema: {
                response: {
                    200: {
                        type: "array",
                        items: { $ref: "Skills#" },
                    },
                },
                tags: ["Skills"],
                summary: "Get all skills data",
                description:
                    "Fetches all skills data from the database and returns it in a structured format.",
            },
        },
        async (): Promise<SkillType[]> => {
            const cached = await cacheManager.get<SkillType[]>(
                "skills",
                getAndParseSkills
            );
            return cached;
        }
    );
};
