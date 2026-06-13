import mongoose from "mongoose";

export interface BlogTypes {
    author: mongoose.Schema.Types.ObjectId;
    title: string;
    excerpt: string;
    image: string;
    content: string;
    category: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
}