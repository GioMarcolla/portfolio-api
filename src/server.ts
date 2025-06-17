import Fastify from "fastify";
import cors from "@fastify/cors";
import { BioDataRoutes } from "./routes/bioDataRoutes";
import { EducationDataRoutes } from "./routes/educationDataRoutes";

const fastify = Fastify({ logger: true });

// Middleware
await fastify.register(cors);

// Routes
await fastify.register(BioDataRoutes);
await fastify.register(EducationDataRoutes);


fastify.get("/health", async () => {
    return { status: "ok" };
});

const start = async () => {
    try {
        await fastify.listen({
            port: parseInt(process.env.PORT || "3000"),
            host: "0.0.0.0",
        });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
