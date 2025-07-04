import { FastifyReply, FastifyRequest } from "fastify";
import { invalidateCacheIfNeeded } from "../utils/cache.js";
import { logger } from "../server.js";

export const cacheInvalidationHook = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    if (/^\/public(\/[^\/]+)+/.test(request.url || "")) return;

    try {
        await invalidateCacheIfNeeded();
    } catch (err) {
        logger.error("Cache invalidation failed", err);
    }
};
