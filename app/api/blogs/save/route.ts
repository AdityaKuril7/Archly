import { ErrorHandler } from "@/lib/errorHandler";
import { verifyToken } from "@/lib/verifyauth";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { blogId } = await req.json();

    const { id } = await verifyToken(req);

    if (!id || !blogId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing user or blog id",
        },
        { status: 400 },
      );
    }

    const user = await User.findById(id);

    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );

    if (user.savedBlogs.includes(blogId)) {
      await User.findByIdAndUpdate(id, { $pull: { savedBlogs: blogId } });
    } else {
      await User.findByIdAndUpdate(id, {
        $push: {
          savedBlogs: {
            $each: [blogId],
            $position: 0,
          },
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 },
    );
  } catch (err) {
    if (err instanceof Error) {
      return ErrorHandler(err.message, 401);
    }
  }
}
