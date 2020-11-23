import User, { IUser } from './model';
import { Document } from 'mongoose';
import { NoResourceFoundException, DuplicateValueException } from '../utils/errors/db';
import { UserDTO } from '../types';

export const createUser = async (data: IUser): Promise<Document> => {
    try {
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            throw new DuplicateValueException("Email is already taken by another user");
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

export const getUserByEmail = async (email: string): Promise<UserDTO> => {
    try {
        const user: Document | null = await User.findOne({ email: email });
        if (user) {
            const dto: UserDTO = user.toObject();
            return dto;
        } else {
            throw new NoResourceFoundException(`No user found with email=${email}`);
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
