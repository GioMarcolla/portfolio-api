// hooks/startPgListenerHook.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { ensurePgListenerStarted } from "../utils/pgListeners.js";

export const startPgListenerHook = async (
    request: FastifyRequest,
    _reply: FastifyReply
) => {
    if (!request.url.startsWith("/public/health")) {
        await ensurePgListenerStarted();
    }
};
