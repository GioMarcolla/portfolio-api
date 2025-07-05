import dotenv from "dotenv";
import { FastifyReply, FastifyRequest } from "fastify";
import { logger } from "../server.js";

dotenv.config();

const auth = async (request: FastifyRequest, reply: FastifyReply) => {
    if (/^\/public(\/[^\/]+)+/.test(request.url || "")) return;

    const apiKey = request.headers["x-api-key"];
    const knownKey = process.env.API_KEY;

    logger.info(apiKey);
    logger.info(knownKey);

    if (!knownKey || apiKey !== knownKey) {
        logger.info("entered?");
        logger.info(!knownKey);
        logger.info(apiKey !== knownKey);
        logger.info(!knownKey || apiKey !== knownKey);

        if (!knownKey)
            logger.error(
                "Missing API Key. All routes will be blocked. Please update the enviroment variables."
            );
        return reply.code(401).send({ error: "Unauthorized" });
    }
};

export default auth;
