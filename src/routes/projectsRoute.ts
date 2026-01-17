import { getAllProject } from "../db/index";
import { parseProject } from "../parsers/index";
import { type ProjectType } from "../zod/schemas/index";
import { logger } from "../server";
import { ProjectDBType } from "../db/db.pgSchema";
import { cacheManager } from "../utils/cache";
import { CustomFastifyInstance } from "../utils/fastifyUtils";

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
