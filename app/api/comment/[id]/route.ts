import connectDb from "@/lib/db";
import { ErrorHandler } from "@/lib/errorHandler";
import Blog from "@/models/blog.model";
import Comment from "@/models/comment.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDb();
    const { id } = await params;
    const { searchParams } = new URL(req.url);

    const blogId = searchParams.get("blogId");

    if (!blogId) return ErrorHandler("Something went wrong");

    if (!id) return ErrorHandler("Comment id required", 400);

    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) return ErrorHandler("Comment not found", 404);

    await Blog.findByIdAndUpdate(blogId, {
      $pull: { comments: comment._id },
    });

    if (!comment) return ErrorHandler("Comment not found", 404);

    return NextResponse.json(
      {
        success: true,
        message: "Deleted successfully",
      },
      { status: 200 },
    );
  } catch (err) {
    if (err instanceof Error) {
      return ErrorHandler(err.message, 400);
    }
  }
}
