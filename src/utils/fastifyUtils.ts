import { FastifyInstance, FastifyTypeProviderDefault } from "fastify";

import cors from "@fastify/cors";
import env from "@fastify/env";
import rateLimit from "@fastify/rate-limit";

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
            if (!origin || (origin && allowedOrigins.includes(origin))) {
                cb(null, true);
            } else {
                cb(new Error("Not allowed by CORS"), false);
            }
        },
    });

    await fastify.register(rateLimit, {
        max: isDev ? 1000 : 120, // Render will trigger a helth check every couple seconds
        timeWindow: "1 minute",
    });
};

export { registerRoutes, registerSchemas, registerMiddlewares };
