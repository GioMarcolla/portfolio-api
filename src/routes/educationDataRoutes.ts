import { FastifyInstance } from "fastify";
import { EducationDataType } from "../types/educationDataType.js";
import { EducationData } from "../data/educationData.js";
import { EducationDataSchema } from "../schemas/educationDataSchema.js";

export const EducationDataRoutes = async (fastify: FastifyInstance) => {
    fastify.get(
        "/educationData",
        { schema: EducationDataSchema },
        async (): Promise<EducationDataType[]> => {
            return EducationData;
        }
    );
};
