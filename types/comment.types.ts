import { ObjectId, Document } from "mongoose";
export interface IComment extends Document {
  userId: ObjectId;
  blogId: ObjectId;
  content: string;
  likes: ObjectId[];
  createdAt: Date;
  updatedAt: string;
}
