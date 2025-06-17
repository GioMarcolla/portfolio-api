import { FastifyInstance } from "fastify";
import { EducationDataType } from "../types/educationDataType";
import { EducationData } from "../data/educationData";
import { EducationDataSchema } from "../schemas/educationDataSchema";

export const EducationDataRoutes = async (fastify: FastifyInstance) => {
    fastify.get(
        "/educationData",
        { schema: EducationDataSchema },
        async (): Promise<EducationDataType[]> => {
            return EducationData;
        }
    );
};
