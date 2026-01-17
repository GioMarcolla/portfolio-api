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

const level = (process.env.PINO_LOG_LEVEL as Level) || "error";
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
        // Disable some features that don't work well in serverless
        disableRequestLogging: process.env.VERCEL ? true : false,
        routerOptions: {
          ignoreTrailingSlash: true,
        }
    });

    await registerSchemas(fastify);
    await registerMiddlewares(fastify);
    await registerRoutes(fastify);
    await registerHooks(fastify);

    return fastify;
};

export { logger, createServer };

let cachedServer: any;
const getServer = async () => {
  if (!cachedServer) {
    cachedServer = await createServer();
    await cachedServer.ready();
  }
  return cachedServer;
};

interface VercelRequest {
  method: string;
  url: string;
  body?: any;
  headers: Record<string, string>;
}

interface VercelResponse {
  statusCode: number;
  setHeader: (key: string, value: string) => void;
  end: (data?: string) => void;
}

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const server = await getServer();
    await server.ready();
    await server.inject({ method: req.method, url: req.url, payload: req.body, headers: req.headers }, (err: Error | null, response: any) => {
      if (err) {
        server.log.error('Fastify inject error:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }

      res.statusCode = response.statusCode;
      Object.keys(response.headers).forEach(key => {
        res.setHeader(key, response.headers[key]);
      });
      res.end(response.payload);
    });
  } catch (error) {
    console.error('Serverless function error:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};