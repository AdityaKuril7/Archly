import {NextRequest, NextResponse} from "next/server";
import {ErrorHandler} from "@/lib/errorHandler";
import Blog from "@/models/blog.model";
import connectDb from "@/lib/db";

export async function POST(req:NextRequest) {
  try{
    await connectDb();
    const {userId,blogId} = await req.json();

    if(!userId || !blogId) return ErrorHandler("userId and blogId are required",400);

    const blog = await Blog.findById(blogId)

    if(blog.likes.includes(userId)){
      await Blog.findByIdAndUpdate(blogId,{$pull:{likes:userId}})
    }else{
      await Blog.findByIdAndUpdate(blogId,{$addToSet:{likes:userId}})
    }

    if(!blog) return ErrorHandler("Blog not found",404);

    return NextResponse.json({
      success: true,
    })

  }catch(e){
    if(e instanceof Error) return ErrorHandler(e.message,400);
  }
}