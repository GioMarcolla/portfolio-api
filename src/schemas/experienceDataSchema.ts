import { FastifySchema } from "fastify";
import { BasicDateSchema } from "./basicDateSchema";
import { BasicLocationSchema } from "./basicLocationSchema";

export const ExperienceDataSchema: FastifySchema = {
    response: {
        200: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "number" },
                    CompanyName: { type: "string" },
                    Department: { type: "string" },
                    Team: { type: "string" },
                    Location: BasicLocationSchema,
                    JobTitle: { type: "string" },
                    JobType: {
                        type: "string",
                        enum: [
                            "Contract",
                            "Part-Time",
                            "Full-Time",
                            "Internship",
                        ],
                    },
                    Level: {
                        type: "string",
                        enum: [
                            "Junior",
                            "Mid",
                            "Senior",
                            "Staff",
                            "Lead",
                            "Manager",
                            "Director",
                            "VP",
                            "Founder",
                            "C-Suite",
                        ],
                    },
                    Description: { type: "string" },
                    Responsibilities: { type: "string" },
                    Achievements: { type: "string" },
                    DateStarted: BasicDateSchema,
                    DateEnd: BasicDateSchema,
                    CurrentJob: { type: "boolean" },
                },
                required: [
                    "id",
                    "CompanyName",
                    "Country",
                    "State",
                    "City",
                    "JobTitle",
                    "JobType",
                    "Description",
                    "Responsibilities",
                    "DateStarted",
                ],
                additionalProperties: false,
            },
        },
    },
};
