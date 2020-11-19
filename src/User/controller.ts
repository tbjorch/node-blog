import { NextFunction, Request, Response } from "express"
import { Document } from "mongoose";
import { DuplicateValueException, NoResourceFoundException } from "../utils/errors/db";
import { BadRequest, InternalServerError, NotFound } from "../utils/errors/http";
import { IUser } from "./model";
import * as service from './service';


export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const bodyJson: IUser = req.body;
    try {
        const user = await service.createUser(bodyJson);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof DuplicateValueException) {
            next(new BadRequest(error.message));
        }
        next(new InternalServerError(`An error occurred on the server side rendering the operation unsuccessful to complete`));
    }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await service.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(new InternalServerError(`An error occurred on the server side rendering the operation unsuccessful to complete`));
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id;
    try {
        const user: Document = await service.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof NoResourceFoundException) {
            next(new NotFound(error.message));
        } else {
            next(new InternalServerError(`An error occurred on the server side rendering the operation unsuccessful to complete`));
        }
    }
}

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id;
    try {
        await service.deleteUserById(userId);
        res.status(200).json({ message: `User with id=${userId} successfully deleted` });
    } catch (error) {
        if (error instanceof NoResourceFoundException) {
            next(new NotFound(error.message));
        } else {
            next(new InternalServerError(`An error occurred on the server side rendering the operation unsuccessful to complete`));
        }
    }
}