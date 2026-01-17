import { FastifyReply, FastifyRequest } from "fastify";
import { invalidateCacheIfNeeded } from "../utils/cache";
import { logger } from "../server";

export const cacheInvalidation = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    if (/^\/public(\/[^\/]+)+/.test(request.url || "")) return;

    try {
        await invalidateCacheIfNeeded();
    } catch (err) {
        logger.error({ err }, "Cache invalidation failed");
    }
};
