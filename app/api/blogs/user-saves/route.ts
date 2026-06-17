import {ErrorHandler} from "@/lib/errorHandler";
import User from "@/models/user.model";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) return ErrorHandler("userId required", 400);

    const blogs = await User.findById(userId)
      .select("savedBlogs")
      .populate("savedBlogs");

    return NextResponse.json(
      {
        success: true,
        message: "Blog fetched successfully",
        blogs: blogs.savedBlogs,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return ErrorHandler(error.message, 400);
    }
  }
}
