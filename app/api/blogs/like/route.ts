import { NextRequest, NextResponse } from "next/server";
import { ErrorHandler } from "@/lib/errorHandler";
import Blog from "@/models/blog.model";
import connectDb from "@/lib/db";
import { verifyToken } from "@/lib/verifyauth";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { blogId } = await req.json();

    const decoded = await verifyToken(req);

    if (!decoded?.id || !blogId)
      return ErrorHandler("userId and blogId are required", 400);

    const blog = await Blog.findById(blogId);

    if (blog.likes.includes(decoded.id)) {
      await Blog.findByIdAndUpdate(blogId, { $pull: { likes: decoded.id } });
    } else {
      await Blog.findByIdAndUpdate(blogId, {
        $addToSet: { likes: decoded.id },
      });
    }

    if (!blog) return ErrorHandler("Blog not found", 404);

    return NextResponse.json({
      success: true,
    });
  } catch (e) {
    if (e instanceof Error) return ErrorHandler(e.message, 400);
  }
}
