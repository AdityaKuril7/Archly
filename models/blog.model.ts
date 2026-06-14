import mongoose, {Schema} from "mongoose";
import {BlogTypes} from "@/types/blog.types";

const BlogModelSchema = new Schema<BlogTypes>({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    excerpt: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        trim: true,
    },
    slug: {
        type: String,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ["draft", "published"],
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
    }]
}, {timestamps: true});

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogModelSchema);

export default Blog;