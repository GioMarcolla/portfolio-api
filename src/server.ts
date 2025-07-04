import dotenv from "dotenv";
import Fastify from "fastify";

import { createLogger, Level } from "./utils/logger.js";
import {
    CustomFastifyInstance,
    registerRoutes,
    registerSchemas,
    isDev,
    registerMiddlewares,
    registerHooks,
} from "./utils/fastifyUtils.js";

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

    await registerMiddlewares(fastify);
    await registerHooks;
    await registerSchemas(fastify);
    await registerRoutes(fastify);

    return fastify;
};

export { logger, createServer };
