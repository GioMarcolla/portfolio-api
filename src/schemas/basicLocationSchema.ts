export const BasicLocationSchema: Record<string, any> = {
    type: "object",
    properties: {
        Country: { type: "string" },
        State: { type: "string" },
        City: { type: "string" },
    },
    required: ["Country", "State", "City"],
};
