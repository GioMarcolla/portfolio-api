import { getAllSkills } from "../db/index";
import { type SkillType } from "../zod/schemas/index";
import { cacheManager } from "../utils/cache";
import { parseSkills } from "../parsers/skillsParsers";
import { SkillsDBType } from "../db/db.pgSchema";
import { CustomFastifyInstance } from "../utils/fastifyUtils";

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
