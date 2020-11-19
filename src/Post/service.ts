import Post, { IPost } from './model';
import { Document } from 'mongoose';
import { NoResourceFoundException } from '../utils/errors/db';

export const createPost = async (data: IPost): Promise<Document> => {
    try {
        const post: Document = new Post(data);
        await post.save();
        return post;
    } catch (error) {
        console.error("Something went wrong when saving post. Error: " + error);
        throw error;
    }
}

export const getAllPosts = async (): Promise<Document[]> => {
    try {
        return await Post.find({});
    } catch (error) {
        console.error("Something went wrong when finding all posts. Error: " + error);
        throw error;
    }
}

export const getPostById = async (id: string): Promise<Document> => {
    try {
        const post: Document | null = await Post.findById(id);
        if (post) {
            return post;
        } else {
            throw new NoResourceFoundException(`No post found with id=${id}`);
        }
    } catch (error) {
        console.error("Something went wrong when finding post by id. Error: " + error);
        throw error;
    }
}

export const deletePostById = async (id: string): Promise<void> => {
    try {
        const post = await getPostById(id);
        await post.deleteOne();
        console.info(`Post with id ${id} deleted successfully`);
    } catch (error) {
        console.error("Something went wrong when deleting post by id. Error: " + error);
        throw error;
    }
}
