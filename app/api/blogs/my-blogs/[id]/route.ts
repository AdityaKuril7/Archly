import connectDb from "@/lib/db";
import {ErrorHandler} from "@/lib/errorHandler";
import {NextRequest, NextResponse} from "next/server";
import Blog from "@/models/blog.model";
import mongoose from "mongoose";


export async function GET(req: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    try {
        await connectDb();

        const {id} = await params;

        const {searchParams} = new URL(req.url);
        const status = await searchParams.get("status");

        const blogs = await Blog.find({author: new mongoose.Types.ObjectId(id),status: status ? status : "published"});

        return NextResponse.json({
            success: true,
            messsage: "Blogs found",
            data: blogs

        }, {status: 200})

    } catch (err) {
        if (err instanceof Error) {
            return ErrorHandler(err.message);
        }
    }
}