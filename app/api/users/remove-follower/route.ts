import connectDb from "@/lib/db";
import { ErrorHandler } from "@/lib/errorHandler";
import { verifyToken } from "@/lib/verifyauth";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { id: currentUser } = await verifyToken(req);
    const { targetUserId } = await req.json();

    if (!currentUser) return ErrorHandler("Unauthorized", 401);

    const user = await User.findById(currentUser);
    if (!user) return ErrorHandler("User not found", 404);

    const isTargetAvalible = await user.followers.some(
      (id: string) => id.toString() === targetUserId,
    );

    if (isTargetAvalible) {
      await User.findByIdAndUpdate(currentUser, {
        $pull: { followers: targetUserId },
      });

      return NextResponse.json(
        {
          success: true,
          message: "Remove from followers list",
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          message: "User not found in followers list",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);

      return ErrorHandler(error.message, 500);
    }
  }
}
