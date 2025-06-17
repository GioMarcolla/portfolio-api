import { FastifySchema } from "fastify";

export const BioDataSchema: FastifySchema = {
    response: {
        200: {
            type: "object",
            properties: {
                Name: {
                    type: "object",
                    properties: {
                        First: { type: "string" },
                        Middle: { type: "string" },
                        Last: { type: "string" },
                    },
                    required: ["First", "Last"],
                },
                Nickname: { type: "string" },
                Birthdate: {
                    type: "object",
                    properties: {
                        Year: { type: "integer" },
                        Month: { type: "integer" },
                        Day: { type: "integer" },
                    },
                    required: ["Year", "Month", "Day"],
                },
                Gender: { type: "string" },
                Profession: { type: "string" },
                Nationalities: {
                    type: "array",
                    items: { type: "string" },
                },
                ResidentOf: {
                    type: "object",
                    properties: {
                        Country: { type: "string" },
                        State: { type: "string" },
                        City: { type: "string" },
                    },
                    required: ["Country", "State", "City"],
                },
            },
            required: [
                "Name",
                "Nickname",
                "Birthdate",
                "Gender",
                "Profession",
                "Nationalities",
                "ResidentOf",
            ],
            additionalProperties: false,
        },
    },
};
