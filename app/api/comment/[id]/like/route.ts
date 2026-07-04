import { ErrorHandler } from "@/lib/errorHandler";
import { verifyToken } from "@/lib/verifyauth";
import Comment from "@/models/comment.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id) return ErrorHandler("Comment not found", 404);
    const { id: userId } = await verifyToken(req);
    const comment = await Comment.findById(id);

    if (comment.likes.includes(userId)) {
      await Comment.findByIdAndUpdate(id, { $pull: { likes: userId } });
      return NextResponse.json({
        success: true,
        message: "Unliked",
      });
    } else {
      await Comment.findByIdAndUpdate(id, { $addToSet: { likes: userId } });
      return NextResponse.json({
        success: true,
        message: "Liked",
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      return ErrorHandler(err.message);
    }
  }
}
