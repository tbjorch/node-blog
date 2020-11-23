import { Schema, model } from 'mongoose';

export interface IPost {
    title: string,
    body: string,
    author: string
}

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default model("Post", postSchema);