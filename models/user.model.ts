import mongoose,{Schema} from "mongoose";
import {UserTypes} from "@/types/user.types";

const userModelSchema = new Schema<UserTypes>({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        default: 'male',
    },
    role: {
        type: String,
        enum: ["admin",'writer','reader'],
    },
    slug:{
        type: String,
    },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userModelSchema);

export default User;