import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/verifyauth";
import { ErrorHandler } from "@/lib/errorHandler";
import User from "@/models/user.model";

export async function PUT(req: NextRequest) {
  try {
    const { id } = await verifyToken(req);
    if (!id) return ErrorHandler("Unauthorized", 401);
    const { data } = await req.json();
    const user = await User.findByIdAndUpdate(id, { ...data });
    if (!user) return ErrorHandler("User not found", 404);

    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully",
        user,
      },
      { status: 200 },
    );
  } catch (err) {
    if (err instanceof Error) {
      return ErrorHandler(err.message, 400);
    }
  }
}
