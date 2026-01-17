import dotenv from "dotenv";
import { FastifyReply, FastifyRequest } from "fastify";
import { logger } from "../server";

dotenv.config();

const auth = async (request: FastifyRequest, reply: FastifyReply) => {
    if (request.method === "OPTIONS") return;
    if (/^\/public(\/[^\/]+)+/.test(request.url || "")) return;

    const apiKey = request.headers["x-api-key"];
    const knownKey = process.env.API_KEY;

    if (!knownKey) {
        logger.error(
            "Missing API Key. All routes will be blocked. Please update the environment variables."
        );
        return reply.code(500).send({ error: "Server misconfiguration" });
    }

    if (apiKey !== knownKey) {
        return reply.code(401).send({ error: "Unauthorized" });
    }
};

export default auth;
