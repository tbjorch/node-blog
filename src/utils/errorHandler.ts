import { NextFunction, Request, Response } from "express";
import { HttpError } from "./errors/http";

export const errorHandler = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
    const name = error.name || "Internal Server Error";
    const status = error.statusCode || 500;
    const msg = error.message || "Something went very wrong";
    res.status(status).json({ errorName: name, statusCode: status, message: msg });
}

