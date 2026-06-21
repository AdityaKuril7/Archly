import connectDb from "@/lib/db";
import { ErrorHandler } from "@/lib/errorHandler";
import Blog from "@/models/blog.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDb();
    const { id } = await params;

    const data = await req.json();

    if (!id) {
      return ErrorHandler("blog id must be required", 400);
    }

    const blog = await Blog.findByIdAndUpdate(id, data, { new: true });

    if (!blog) {
      return ErrorHandler("blog not found", 404);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Blog updated successfully",
        data: blog,
      },
      { status: 200 },
    );
  } catch (err) {
    if (err instanceof Error) {
      return ErrorHandler(err.message);
    }
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDb();
    const { id } = await params;

    if (!id) return ErrorHandler("id must be required", 400);

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return ErrorHandler("blog not found", 404);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Blog deleted successfully",
      },
      { status: 200 },
    );
  } catch (err) {
    if (err instanceof Error) {
      return ErrorHandler(err.message,400);
    }
  }
}