import {NextRequest, NextResponse} from "next/server";
import {ErrorHandler} from "@/lib/errorHandler";
import Blog from "@/models/blog.model";
import connectDb from "@/lib/db";


export async function GET(req:NextRequest,{params}:{params: Promise<{slug: string}>}){
    try{

        await connectDb();
        const {slug} = await params;

        const blog = await Blog.find({slug:slug}).populate(
            "author",
            "username email gender savedBlogs"
        )

        if(blog?.length ==0 || blog === null){
            return ErrorHandler("No blogs found",200);
        }

        return NextResponse.json({
            success: true,
            message:"Blog fetchd successfully",
            blog,
        })

    }catch(err){
        if(err instanceof Error){
            return ErrorHandler(err.message);
        }
    }
}

export async function PUT(req:NextRequest,{params}:{params:Promise<{id: string}>}){
    try{

        await connectDb();
        const {id} = await params;

        const data = await req.json();

        if(!id){
            return ErrorHandler("blog id must be required",400);
        }


        const blog = await Blog.findByIdAndUpdate(id, data, {new: true});

        if(!blog){
            return ErrorHandler("blog not found",404);
        }

        return NextResponse.json({
            success: true,
            message:"Blog updated successfully",
            data: blog
        },{status:200})
    }catch(err){
        if(err instanceof Error){

            return ErrorHandler(err.message);
        }
    }
}

export async function DELETE(req:NextRequest,{params}:{params:Promise<{id: string}>}){
    try{
        await connectDb();
        const {id} = await params;

        if(!id) return ErrorHandler("id must be required",400);

        const blog = await Blog.findByIdAndDelete(id)
        if(!blog){
            return ErrorHandler("blog not found",404);
        }

        return NextResponse.json({
            success: true,
            message:"Blog deleted successfully",
        },{status:200})
    }catch(err){
        if(err instanceof Error){
            return ErrorHandler(err.message);
        }
    }
}