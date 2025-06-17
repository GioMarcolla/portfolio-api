import { FastifyInstance } from "fastify";
import { ExperienceDataType } from "../types/experienceDataType.js";
import { ExperienceData } from "../data/experienceData.js";
import { ExperienceDataSchema } from "../schemas/experienceDataSchema.js";

export const ExperienceDataRoutes = async (fastify: FastifyInstance) => {
    fastify.get(
        "/experienceData",
        { schema: ExperienceDataSchema },
        async (): Promise<ExperienceDataType[]> => {
            return ExperienceData;
        }
    );
};
