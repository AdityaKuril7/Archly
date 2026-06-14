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
  likes: mongoose.Schema.Types.ObjectId[];
}

interface IAuthorSchema {
  _id: string;
  username: string;
  email: string;
  gender: "male" | "female" | "other";
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
  __v: number;
}
