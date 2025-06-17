import { FastifyInstance } from "fastify";
import { BioDataSchema } from "../schemas/bioDataSchema";
import { BioDataType } from "../types/bioDataType";
import { BioData } from "../data/bioData";

export const BioDataRoutes = async (fastify: FastifyInstance) => {
    fastify.get(
        "/bioData",
        { schema: BioDataSchema },
        async (): Promise<BioDataType> => {
            return BioData;
        }
    );
};
