import mongoose, {Schema} from "mongoose";
import {IUserModel} from "@/types/user.types";

const userModelSchema = new Schema<IUserModel>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    bio: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["admin", "writer", "reader"],
    },
    slug: {
      type: String,
    },
    avatar: {
      type:String,
      default: ""
    },
    savedBlogs: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Blog" }],
      default: [], // ensures every user document has this field
    },
    following: {
      type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
      default: [], // ensures every user document has this field
    },
    followers: {
      type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
      default: [], // ensures every user document has this field
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userModelSchema);

export default User;
