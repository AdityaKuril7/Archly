import { ErrorHandler } from "@/lib/errorHandler";
import { verifyToken } from "@/lib/verifyauth";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    
    const decoded = await verifyToken(req);
    if(!decoded) return

    const user = await User.findById(decoded?.id).select("-password");

    return NextResponse.json({
      success: true,
      message: "User fetch successfully",
      user,
    });
  } catch (err) {
    if (err instanceof Error) {
      return ErrorHandler(err.message, 400);
    }
  }
}
