import connectDb from "@/lib/db";
import { ErrorHandler } from "@/lib/errorHandler";
import Blog from "@/models/blog.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q")?.toLowerCase() || "";

    const blogs = await Blog.find({
      status: "published",
      $or: [
        {
          title: { $regex: q, $options: "i" },
        },
        { excerpt: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ],
    }).lean();

    return NextResponse.json({
      success: true,
      message: " Blogs Fetched",
      blogs,
    });
  } catch (error) {
    if (error instanceof Error) {
      return ErrorHandler(error.message, 400);
    }
  }
}
