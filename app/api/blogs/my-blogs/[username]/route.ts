import connectDb from "@/lib/db";
import {ErrorHandler} from "@/lib/errorHandler";
import {NextRequest, NextResponse} from "next/server";
import Blog from "@/models/blog.model";
import mongoose from "mongoose";
import User from "@/models/user.model";


export async function GET(req: NextRequest, {params}: { params: Promise<{ username: string }> }) {
    try {
        await connectDb();

        const {username} = await params;

        const {searchParams} = new URL(req.url);
        const status = await searchParams.get("status");

        console.log(username)

        const user = await User.findOne({username:username}).select("-password");

        if(!user) return ErrorHandler("User not found",404)

        const blogs = await Blog.find({author: new mongoose.Types.ObjectId(user._id),status: status ? status : "published"}).populate("author", "username");

        return NextResponse.json({
            success: true,
            messsage: "Profile fetched",
            user,
            blogs,


        }, {status: 200})

    } catch (err) {
        if (err instanceof Error) {
            return ErrorHandler(err.message);
        }
    }
}