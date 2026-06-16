import {NextRequest, NextResponse} from "next/server";
import User from "@/models/user.model";
import {ErrorHandler} from "@/lib/errorHandler";
import connectDb from "@/lib/db";

export async function POST(req:NextRequest) {
  try{
    await connectDb();
    const {followerId,followingId} = await req.json();

    const user = await User.findById(followingId)
    const isFollowing = user.followers.some(
      (id:string) => id.toString() === followerId
    );
    if(isFollowing){
      await User.findByIdAndUpdate(followingId,{$pull:{followers:followerId}})
      await User.findByIdAndUpdate(followerId,{$pull:{following:followingId}})
      return NextResponse.json({
        success: true,
        message: "Unfollowed successfully",
      },{status:200})
    }else{
      await User.findByIdAndUpdate(followingId,{$addToSet:{followers:followerId}})
      await User.findByIdAndUpdate(followerId,{$addToSet:{following:followingId}})
      return NextResponse.json({
        success: true,
        message: "Followed successfully",
      },{status:200})
    }

  }catch(error){
    if(error instanceof Error){
      return ErrorHandler(error.message,400)
    }
  }
}