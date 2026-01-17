import { createServer } from "./server";

const main = async () => {
    const fastify = await createServer();
    const port = Number(fastify.config.PORT);

    try {
        await fastify.listen({ port, host: "0.0.0.0" });
        fastify.log.info(`Server is running on port ${port}`);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};

main();
