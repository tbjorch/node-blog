import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { BadRequest } from './errors/http';

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messageArray: string[] = [];
        errors.array().forEach(error => {
            messageArray.push(error.msg);
        });
        next(new BadRequest(messageArray.join(", ")));
    }
    return next();
}