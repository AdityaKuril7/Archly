import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { ErrorHandler } from "@/lib/errorHandler";
import connectDb from "@/lib/db";
import { verifyToken } from "@/lib/verifyauth";
import mongoose, { Types } from "mongoose";
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let value: string | null = searchParams.get("filter");
    if (!value) {
      value = "followers";
    }

    const { id } = await verifyToken(req);
    if (!id) {
      return ErrorHandler("Unauthorized", 401);
    }

    const connections = await User.find({
      _id: new mongoose.Types.ObjectId(id),
    })
      .select(value)
      .populate(value, "username avatar");

    return NextResponse.json(
      {
        success: true,
        message: "Connections fetched successfully",
        connections,
      },
      { status: 200 },
    );
  } catch (e) {
    if (e instanceof Error) {
      return ErrorHandler(e.message, 400);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { id: currentUser } = await verifyToken(req);
    if (!currentUser) return ErrorHandler("Unauthorized", 401);
    const { targetUserId } = await req.json();

    if (currentUser === targetUserId) {
      return ErrorHandler("You cannot follow yourself", 400);
    }

    const user = await User.findById(targetUserId);
    const isFollowing = user.followers.some(
      (id: string) => id.toString() === currentUser,
    );
    if (isFollowing) {
      await User.findByIdAndUpdate(targetUserId, {
        $pull: { followers: currentUser },
      });
      await User.findByIdAndUpdate(currentUser, {
        $pull: { following: targetUserId },
      });
      return NextResponse.json(
        {
          success: true,
          message: "Unfollowed successfully",
        },
        { status: 200 },
      );
    } else {
      await User.findByIdAndUpdate(targetUserId, {
        $addToSet: { followers: currentUser },
      });
      await User.findByIdAndUpdate(currentUser, {
        $addToSet: { following: targetUserId },
      });
      return NextResponse.json(
        {
          success: true,
          message: "Followed successfully",
        },
        { status: 200 },
      );
    }
  } catch (e) {
    if (e instanceof Error) {
      return ErrorHandler(e.message, 400);
    }
  }
}
