import {ErrorHandler} from "@/lib/errorHandler";
import User from "@/models/user.model";
import {NextRequest, NextResponse} from "next/server";
import {verifyToken} from "@/lib/verifyauth";

export async function POST(req: NextRequest) {
  try {

    const {id} = await verifyToken(req)
    if(!id) return ErrorHandler("Unauthorized",401)

    const blogs = await User.findById(id)
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
