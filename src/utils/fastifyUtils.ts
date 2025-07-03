import { FastifyInstance, FastifyTypeProviderDefault } from "fastify";

import {
    BiodataRoutes,
    EducationRoutes,
    ExperienceRoutes,
    SkillsRoutes,
} from "../routes/index.js";
import {
    BiodataJsonSchema,
    EducationJsonSchema,
    ExperienceJsonSchema,
    SkillJsonSchema,
} from "../zod/schemas/index.js";
import { IncomingMessage, Server, ServerResponse } from "http";
import { Logger } from "pino";

export type CustomFastifyInstance = FastifyInstance<
    Server<typeof IncomingMessage, typeof ServerResponse>,
    IncomingMessage,
    ServerResponse,
    Logger,
    FastifyTypeProviderDefault
>;

const registerRoutes = async (fastify: CustomFastifyInstance) => {
    await fastify.register(BiodataRoutes);
    await fastify.register(EducationRoutes);
    await fastify.register(ExperienceRoutes);
    await fastify.register(SkillsRoutes);
};

const registerSchemas = async (fastify: CustomFastifyInstance) => {
    fastify.addSchema({
        $id: "Education",
        ...EducationJsonSchema,
    });

    fastify.addSchema({
        $id: "Experience",
        ...ExperienceJsonSchema,
    });

    fastify.addSchema({
        $id: "Biodata",
        ...BiodataJsonSchema,
    });

    fastify.addSchema({
        $id: "Skills",
        ...SkillJsonSchema,
    });
};

export { registerRoutes, registerSchemas };
