import { NextRequest, NextResponse } from "next/server";
import { ErrorHandler } from "@/lib/errorHandler";
import Blog from "@/models/blog.model";
import connectDb from "@/lib/db";
import { verifyToken } from "@/lib/verifyauth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectDb();
    const { slug } = await params;

    const decoded = await verifyToken(req);

    const blog = await Blog.find({ slug: slug })
      .populate({
        path: "comments",
        options: {sort: { createdAt: -1}},
        populate: { path: "userId", select: "username" },
      })
      .populate(
        "author",
        "username email gender savedBlogs followers following avatar",
      );
    if (blog?.length == 0 || blog === null) {
      return ErrorHandler("No blogs found", 200);
    }

    await Blog.findByIdAndUpdate(blog[0]._id, {
      $addToSet: { viewedBy: decoded?.id },
    });

    return NextResponse.json({
      success: true,
      message: "Blog fetched successfully",
      blog,
    });
  } catch (err) {
    if (err instanceof Error) {
      return ErrorHandler(err.message,401);
    }
  }
}
