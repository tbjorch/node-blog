import { NextFunction, Request, Response } from "express";
import { InternalServerError, NotFound } from '../utils/errors/http';
import { Document } from "mongoose";
import { IPost } from "./model";
import * as service from './service';
import { NoResourceFoundException } from "../utils/errors/db";


export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    const bodyJson: IPost = req.body;
    try {
        const post = await service.createPost(bodyJson);
        res.status(201).json(post);
    } catch (error) {
        next(new InternalServerError("Something went wrong when saving the post"));
    }
}

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await service.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        next(new InternalServerError("Something went wrong when getting all posts from the database"));
    }
}

export const getPostById = async (req: Request, res: Response, next: NextFunction) => {
    const postId: string = req.params.id;
    try {
        const post: Document = await service.getPostById(postId);
        res.status(200).json(post);
    } catch (error) {
        if (error instanceof NoResourceFoundException) {
            next(new NotFound(error.message));
        } else {
            next(new InternalServerError(`An error occurred on the server side rendering the operation unsuccessful to complete`));
        }
    }
}

export const deletePostById = async (req: Request, res: Response, next: NextFunction) => {
    const postId: string = req.params.id;
    try {
        await service.deletePostById(postId);
        res.status(200).json({ message: `Post with id=${postId} successfully deleted` });
    } catch (error) {
        if (error instanceof NoResourceFoundException) {
            next(new NotFound(error.message));
        } else {
            next(new InternalServerError(`An error occurred on the server side rendering the operation unsuccessful to complete`));
        }
    }
}