import { Request, Response, NextFunction } from 'express';

export const errorValidateHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    err && err.error && err.error.isJoi
        ? res.json({
            type: err.type,
            message: err.error.toString()
        })
        : next(err);
};
