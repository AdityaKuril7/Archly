import mongoose, { Schema } from "mongoose";
import { IBlogModel } from "@/types/blog.types";

const BlogModelSchema = new Schema<IBlogModel>(
  {
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
    viewedBy: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true },
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogModelSchema);

export default Blog;
