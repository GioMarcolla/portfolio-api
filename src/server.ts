import dotenv from "dotenv";
import Fastify from "fastify";

import { createLogger, Level } from "./utils/logger.js";
import {
    CustomFastifyInstance,
    registerRoutes,
    registerSchemas,
    isDev,
    registerMiddlewares,
} from "./utils/fastifyUtils.js";
import { startPgListener } from "./utils/pgListeners.js";
import auth from "./hooks/authHook.js";
import { verifyOrigin } from "./hooks/originHook.js";

dotenv.config();

const level = process.env.PINO_LOG_LEVEL as Level;
const logger = createLogger({ level, isDev });

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
    await registerMiddlewares(fastify);

    // Hoks
    fastify.addHook("preHandler", verifyOrigin);
    fastify.addHook("onRequest", auth);

    // Register Helpers
    await registerSchemas(fastify);
    await registerRoutes(fastify);

    // DB event listeners
    await startPgListener();

    return fastify;
};

export { logger, createServer };
