import connectDb from "@/lib/db";
import { ErrorHandler } from "@/lib/errorHandler";
import Comment from "@/models/comment.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDb();
    const { id } = await params;

    if (!id) return ErrorHandler("Comment id required", 400);

    const comment = await Comment.findByIdAndDelete(id);

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
