import { FastifyInstance, FastifyTypeProviderDefault } from "fastify";

import cors from "@fastify/cors";
import env from "@fastify/env";
import rateLimit from "@fastify/rate-limit";

import {
    BiodataRoutes,
    EducationRoutes,
    ExperienceRoutes,
    ProjectsRoutes,
    SkillsRoutes,
} from "../routes/index";
import {
    BiodataJsonSchema,
    EducationJsonSchema,
    ExperienceJsonSchema,
    ProjectJsonSchema,
    SkillJsonSchema,
} from "../zod/schemas/index";
import { IncomingMessage, Server, ServerResponse } from "http";
import { Logger } from "pino";
import { verifyOrigin } from "../hooks/originHook";
import auth from "../hooks/authHook";
import { cacheInvalidation } from "../hooks/cacheInvalidationHook";

export const isDev = process.env.NODE_ENV === "development";

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
    await fastify.register(ProjectsRoutes);

    fastify.get("/public/health", async () => {
        return { status: "ok" };
    });
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

    fastify.addSchema({
        $id: "Projects",
        ...ProjectJsonSchema,
    });
};

const schema = {
    type: "object",
    required: ["PORT", "DATABASE_URL"],
    properties: {
        PORT: {
            type: "string",
            default: 3000,
        },
        DATABASE_URL: {
            type: "string",
        },
        PINO_LOG_LEVEL: {
            type: "string",
            default: "error",
        },
        NODE_ENV: {
            type: "string",
            default: "production",
        },
    },
};

const options = {
    schema: schema,
    dotenv: true,
};

const registerMiddlewares = async (fastify: CustomFastifyInstance) => {
    await fastify.register(env, options);
    await fastify.register(cors, {
        origin: (origin, cb) => {
            const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(
                ","
            );
            fastify.log.info(`Incoming Origin: ${origin}`);
            fastify.log.info(`Incoming Origin: ${allowedOrigins}`);

            if (isDev) allowedOrigins.push("http://localhost:3000")
            if (!origin) return cb(null, true);


            const match = allowedOrigins.some(o => origin.startsWith(o));
            return cb(null, match);
        },
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "x-api-key"]
    });

    await fastify.register(rateLimit, {
        max: isDev ? 1000 : 120,
        timeWindow: "1 minute",
    });
};

const registerHooks = async (fastify: CustomFastifyInstance) => {
    fastify.addHook("preHandler", cacheInvalidation);
    fastify.addHook("preHandler", verifyOrigin);
    fastify.addHook("onRequest", auth);
};

export { registerRoutes, registerSchemas, registerMiddlewares, registerHooks };
