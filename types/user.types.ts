import mongoose from "mongoose";

export interface ISignupUserSchema {
  username: string;
  email: string;
  password: string;
}

export interface IUserModel {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  gender: string;
  bio: string;
  avatar: string;
  role: string;
  slug: string;
  savedBlogs: mongoose.Types.ObjectId[];
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
}

export interface ILoggedUserSchema {
  _id: string;
  username: string;
  email: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  bio: string;
  savedBlogs: string[];
  followers: string[];
  following: string[];
  __v: number;
}

export interface ILoginSchema {
  email: string;
  password: string;
}

export interface IUpdateUser {
  username:string | null
  avatar: string | null
  bio: string | null
}
