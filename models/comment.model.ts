import { IComment } from "@/types/comment.types";
import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema<IComment>(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blogId: {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
