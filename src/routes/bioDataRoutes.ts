import { FastifyInstance } from "fastify";
import { BioDataSchema } from "../schemas/bioDataSchema.js";
import { BioDataType } from "../types/bioDataType.js";
import { BioData } from "../data/bioData.js";

export const BioDataRoutes = async (fastify: FastifyInstance) => {
    fastify.get(
        "/bioData",
        { schema: BioDataSchema },
        async (): Promise<BioDataType> => {
            return BioData;
        }
    );
};
