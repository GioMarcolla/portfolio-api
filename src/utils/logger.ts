import pino, { type Level } from "pino";
import pretty from "pino-pretty";

export { Level };

const stream = pretty({
    levelFirst: true,
    colorize: true,
    ignore: "time,hostname,pid",
});

type CreateLoggerArgs = {
    level: Level;
    isDev: boolean;
};

export const createLogger = ({ level, isDev }: CreateLoggerArgs) => {
    return pino(
        {
            level,
            redact: ["req.headers.authorization"],
            formatters: {
                level: (label) => {
                    return { level: label.toUpperCase() };
                },
            },
            ...(isDev && { transport: { target: "pino-pretty" } }),
        },
        stream
    );
};
