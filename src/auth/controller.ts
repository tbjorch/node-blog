import { NextFunction, Request, Response } from "express";
import { Document } from "mongoose";
import { UserDTO } from "../types";
import { IUser } from "../User/model";
import { createUser, getUserByEmail } from "../User/service";
import { DuplicateValueException, NoResourceFoundException } from "../utils/errors/db";
import { BadRequest, InternalServerError } from "../utils/errors/http";
import { ILogin, ISignup } from "./interfaces";
import { createPasswordHash, validatePasswordHash } from "./service";


export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const signupData: ISignup = req.body;
    try {
        const passwordHash: string = await createPasswordHash(signupData.password);
        const userData: IUser = {
            email: signupData.email,
            passwordHash: passwordHash,
        }
        const user: Document = await createUser(userData);
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        if (error instanceof DuplicateValueException) {
            next(new BadRequest("Email is already used on another user"));
        }
        next(new InternalServerError(`An error occurred on the server side rendering the operation unsuccessful to complete`));
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const loginData: ILogin = req.body;
    try {
        const user: UserDTO = await getUserByEmail(loginData.email);
        const passwordMatches: Boolean = await validatePasswordHash(loginData.password, user.passwordHash)
        if (passwordMatches) {
            res.status(200).json({ message: "Successfully logged in" });
        } else {
            next(new BadRequest("Incorrect username or password"));
        }
    } catch (error) {
        if (error instanceof NoResourceFoundException) {
            next(new BadRequest("Incorrect username or password"));
        }
        next(new InternalServerError(`An error occurred on the server side rendering the operation unsuccessful to complete`));
    }
}

export const logout = (req: Request, res: Response, next: NextFunction) => {

}