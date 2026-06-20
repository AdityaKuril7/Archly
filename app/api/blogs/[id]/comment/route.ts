import connectDb from "@/lib/db";
import { ErrorHandler } from "@/lib/errorHandler";
import { verifyToken } from "@/lib/verifyauth";
import Blog from "@/models/blog.model";
import Comment from "@/models/comment.model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDb();
    const { id } = await params;

    const data = await req.json();

    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return ErrorHandler("Unauthorized", 401);
    }

    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      return ErrorHandler("Server Error", 500);
    }

    const decoded = await verifyToken(token);
    console.log(decoded);

    const comment = await Comment.create({
      ...data,
      userId: decoded?.id,
      blogId: id,
    });

    await Blog.findByIdAndUpdate(id, {
      $push: { comments: comment._id },
    });

    if (comment) {
      return NextResponse.json({
        success: true,
        message: "Comment uploaded",
        comment,
      },{status:201});
    }
  } catch (error) {
    if (error instanceof Error) {
      return ErrorHandler(error.message, 500);
    }
  }
}
