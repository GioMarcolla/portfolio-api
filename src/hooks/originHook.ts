import dotenv from "dotenv";
import { FastifyReply, FastifyRequest } from "fastify";
import { logger } from "../server.js";
import { isDev } from "../utils/fastifyUtils.js";

dotenv.config();

export async function verifyOrigin(
    request: FastifyRequest,
    reply: FastifyReply
) {
    if (req.method === "OPTIONS") return;
    if (/^\/public(\/[^\/]+)+/.test(request.url || "")) return;

    const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(",");
    if (isDev) allowedOrigins.push("http://localhost:3000")

    const origin = request.headers["origin"] || request.headers["referer"];
    if (
        !allowedOrigins ||
        !origin ||
        !allowedOrigins.some((o) => origin.startsWith(o))
    ) {
        if (!allowedOrigins)
            logger.error(
                "Missing Allowed Origins. All routes will be blocked. Please update the enviroment variables."
            );
        return reply.status(401).send({ error: "Forbidden" });
    }
}
