import { Schema, model } from 'mongoose';

export interface IUser {
    username: string,
    password: string
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

export default model("User", userSchema);