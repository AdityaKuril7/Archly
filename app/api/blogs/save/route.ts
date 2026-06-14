import { ErrorHandler } from "@/lib/errorHandler";
import Blog from "@/models/blog.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, blogId } = await req.json();

    if (!userId || !blogId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing user or blog id",
        },
        { status: 400 },
      );
    }

    const user = await User.findById(userId);

    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );

    if (user.savedBlogs.includes(blogId)) {
      await User.findByIdAndUpdate(userId, { $pull: { savedBlogs: blogId } });
    } else {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { savedBlogs: blogId },
      });
    }

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 },
    );
  } catch (err) {
    return ErrorHandler(err.message);
  }
}
