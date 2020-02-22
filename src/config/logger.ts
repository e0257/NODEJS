import * as winston from 'winston';
import expressWinston from 'express-winston';

const options = {
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf((info) => {
            const { timestamp, level, message, ...args } = info;
            const ts = timestamp.slice(0, 19).replace('T', ' ');
            return `${ts} [${level}]: ${message}\n ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
        })
    ),
    exitOnError: false,
    transports: [
        new winston.transports.Console({ level: 'info' }),
    ],
};

export const logger: winston.Logger = winston.createLogger(options);

export const expressLogger = expressWinston.logger(options);
export const expressErrorLogger = expressWinston.errorLogger({
    ...options,
    transports: [
        new winston.transports.Console({ level: 'error' }),
    ]
});

export const controllerLogger = (methodName: string, errMessage: string, parameters?: any) => {
    return { methodName, errMessage, parameters }
};