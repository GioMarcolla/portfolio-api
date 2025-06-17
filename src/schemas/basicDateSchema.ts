export const BasicDateSchema: Record<string, any> = {
    type: "object",
    properties: {
        Year: { type: "number" },
        Month: { type: "number" },
        Day: { type: "number" },
    },
    required: ["Year", "Month"],
};
