import dotenv from "dotenv";
import Fastify from "fastify";

import cors from "@fastify/cors";
import env from "@fastify/env";
import rateLimit from "@fastify/rate-limit";

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
    await fastify.register(cors, {
        origin: (origin, cb) => {
            const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(
                ","
            );
            if (origin && allowedOrigins.includes(origin)) {
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

    // Hoks
    fastify.addHook("preHandler", verifyOrigin);
    fastify.addHook("onRequest", auth);

    // Register Helpers
    await registerSchemas(fastify);
    await registerRoutes(fastify);

    fastify.get("/public/health", async () => {
        return { status: "ok" };
    });

    // DB event listeners
    await startPgListener();

    return fastify;
};

export { logger, createServer };
