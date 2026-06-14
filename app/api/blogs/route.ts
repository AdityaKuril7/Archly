import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Blog from "@/models/blog.model";
import { ErrorHandler } from "@/lib/errorHandler";

export async function GET() {
  try {
    await connectDb();

    const blogs = await Blog.find({ status: "published" }).populate(
      "author",
      "username email gender",
    );

    if (blogs.length == 0) {
      return ErrorHandler("No blogs found", 200);
    }

    return NextResponse.json({
      success: true,
      message: "Blog fetched successfully",
      blogs,
    });
  } catch (err) {
    if (err instanceof Error) {
      return ErrorHandler(err.message);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const data = await req.json();

    const blog = await Blog.create({ ...data });

    if (!blog) {
      return ErrorHandler("Something went wrong");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully",
        data: blog,
      },
      { status: 201 },
    );
  } catch (err) {
    if (err instanceof Error) {
      return ErrorHandler(err.message);
    }
  }
}
