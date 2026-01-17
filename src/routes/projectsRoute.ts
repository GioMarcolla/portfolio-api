import { getAllProject } from "../db/index.js";
import { parseProject } from "../parsers/index.js";
import { type ProjectType } from "../zod/schemas/index.js";
import { logger } from "../server.js";
import { ProjectDBType } from "../db/db.pgSchema.js";
import { cacheManager } from "../utils/cache.js";
import { CustomFastifyInstance } from "../utils/fastifyUtils.js";

export const getAndParseProjects = async () => {
    try {
        const data: ProjectDBType[] = await getAllProject();
        if (!data) throw Error("Received empty response from DB.");

        const parsedData: ProjectType[] = parseProject(data);
        return parsedData;
    } catch (e) {
        return logger.error(e);
    }
};

export const ProjectsRoutes = async (fastify: CustomFastifyInstance) => {
    fastify.get(
        "/projects",
        {
            schema: {
                response: {
                    200: {
                        type: "array",
                        items: { $ref: "Projects#" },
                    },
                },
                tags: ["Projects"],
                summary: "Get all projects data",
                description:
                    "Fetches all projects data from the database and returns it in a structured format.",
            },
        },
        async (): Promise<ProjectType[]> => {
            const cached = await cacheManager.get<ProjectType[]>(
                "projects",
                getAndParseProjects
            );
            return cached;
        }
    );
};
