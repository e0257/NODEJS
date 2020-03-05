import { Request, Response, NextFunction } from 'express';
import { logger } from "../config";

export const errorValidateHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    err && err.error && err.error.isJoi
        ? res.json({
            type: err.type,
            message: err.error.toString()
        })
        : next(err);
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        logger.error(err.error.toString());
        res.status(500).json({
            type: err.type,
            message: 'Server error:\n' + err.error.toString()
        });
    } else {
        next(err);
    }
};

export const errorAuthHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    err && err.name === 'UnauthorizedError'
        ? res.status(401).json({ message: 'Invalid Token' })
        : next(err);
};

process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Rejection:', err)
});

process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err)
});
