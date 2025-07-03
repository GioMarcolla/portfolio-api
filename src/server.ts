import dotenv from "dotenv";
import Fastify from "fastify";

import cors from "@fastify/cors";
import env from "@fastify/env";

import { createLogger, Level } from "./utils/logger.js";
import {
    CustomFastifyInstance,
    registerRoutes,
    registerSchemas,
} from "./utils/fastifyUtils.js";
import { startPgListener } from "./utils/pgListeners.js";
import auth from "./hooks/authHook.js";
import { verifyOrigin } from "./hooks/originHook.js";

dotenv.config();

const level = process.env.PINO_LOG_LEVEL as Level;
const isDev = process.env.NODE_ENV === "development";
const logger = createLogger({ level, isDev });

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

declare module "fastify" {
    interface FastifyInstance {
        config: {
            PORT: string;
            DATABASE_URL: string;
            PINO_LOG_LEVEL: string;
            NODE_ENV: string;
        };
    }
}

const createServer = async (): Promise<CustomFastifyInstance> => {
    const fastify = Fastify({
        loggerInstance: logger,
    });

    // Middleware
    await fastify.register(env, options);
    await fastify.register(cors);

    // Hoks
    fastify.addHook("preHandler", verifyOrigin);
    fastify.addHook("preHandler", auth);

    await registerSchemas(fastify);
    await registerRoutes(fastify);

    fastify.get("/health", async () => {
        return { status: "ok" };
    });

    await startPgListener();

    return fastify;
};

export { logger, createServer };
