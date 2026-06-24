import mongoose from "mongoose";

export interface IBlogModel {
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
  comments: string[];
  likes: mongoose.Schema.Types.ObjectId[];
  viewedBy: mongoose.Schema.Types.ObjectId[];
}

interface IAuthorSchema {
  _id: string;
  username: string;
  avatar:string;
  email: string;
  gender: "male" | "female" | "other";
  followers: string[];
  following: string[];
}
export interface IComment {
  _id: string;
  userId: {
    _id: string;
    username: string;
  };
  blogId: string;
  likes: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IBlogSchema {
  _id: string;
  author: IAuthorSchema;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  image: string;
  category: string;
  status: "draft" | "published";
  likes: string[];
  createdAt: string;
  updatedAt: string;
  viewedBy: string[];
  comments: IComment[];
  __v: number;
}

export interface AddBlogSchema {
  title: string;
  excerpt: string;
  image: string | null;
  content: string;
  category: string;
  status: "draft" | "published";
}
