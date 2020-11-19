import User, { IUser } from './model';
import { Document } from 'mongoose';
import { NoResourceFoundException, DuplicateValueException } from '../utils/errors/db';

export const createUser = async (data: IUser): Promise<Document> => {
    try {
        const existingUser = await User.findOne({ username: data.username });
        if (existingUser) {
            throw new DuplicateValueException("Username is already taken by another user");
        }
        const user: Document = new User(data);
        return await user.save();
    } catch (error) {
        console.error("Something went wrong when saving user. Error: " + error);
        throw error;
    }
}

export const getAllUsers = async (): Promise<Document[]> => {
    try {
        return await User.find({});
    } catch (error) {
        console.error("Something went wrong when finding all users. Error: " + error);
        throw error;
    }
}

export const getUserById = async (id: string): Promise<Document> => {
    try {
        const user: Document | null = await User.findById(id);
        if (user) {
            return user;
        } else {
            throw new NoResourceFoundException(`No user found with id=${id}`);
        }
    } catch (error) {
        console.error("Something went wrong when finding user by id. Error: " + error);
        throw error;
    }
}

export const deleteUserById = async (id: string): Promise<void> => {
    try {
        const user = await getUserById(id);
        await user.deleteOne();
        console.info(`User with id ${id} deleted successfully`);
    } catch (error) {
        console.error("Something went wrong when deleting user by id. Error: " + error);
        throw error;
    }
}
