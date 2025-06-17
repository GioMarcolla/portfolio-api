import { FastifySchema } from "fastify";
import { BasicDateSchema } from "./basicDateSchema";
import { BasicLocationSchema } from "./basicLocationSchema";

export const EducationDataSchema: FastifySchema = {
    response: {
        200: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "number" },
                    Institution: { type: "string" },
                    Location: BasicLocationSchema,
                    Degree: { type: "string" },
                    DegreeShort: { type: "string" },
                    Major: { type: "string" },
                    Track: { type: "string" },
                    DateStarted: BasicDateSchema,
                    DateCompleted: BasicDateSchema,
                    Completed: { type: "boolean" },
                },
                required: [
                    "id",
                    "Institution",
                    "Location",
                    "Degree",
                    "DegreeShort",
                    "Major",
                    "DateStarted",
                    "Completed",
                ],
                additionalProperties: false,
            },
        },
    },
};
