import { Schema, model } from 'mongoose';

export interface IUser {
    email: string,
    passwordHash: string
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default model("User", userSchema);