import {NextRequest, NextResponse} from "next/server";
import {ErrorHandler} from "@/lib/errorHandler";
import Blog from "@/models/blog.model";
import connectDb from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectDb();
    const { slug } = await params;
    const {searchParams} = new URL(req.url);

    const userId = searchParams.get("userId");

    const blog = await Blog.find({ slug: slug }).populate(
      "author",
      "username email gender savedBlogs followers following",
    );


    if (blog?.length == 0 || blog === null) {
      return ErrorHandler("No blogs found", 200);
    }

    await Blog.findByIdAndUpdate(blog[0]._id, {$addToSet: {viewedBy: userId}})

    return NextResponse.json({
      success: true,
      message: "Blog fetched successfully",
      blog,
    });
  } catch (err) {
    if (err instanceof Error) {
      return ErrorHandler(err.message);
    }
  }
}
