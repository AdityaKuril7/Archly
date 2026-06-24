import {NextRequest, NextResponse} from "next/server";
import User from "@/models/user.model";
import {ErrorHandler} from "@/lib/errorHandler";
import connectDb from "@/lib/db";
import {verifyToken} from "@/lib/verifyauth";
import mongoose, {Types} from "mongoose";
export async function GET(req:NextRequest){
  try{
    const {searchParams} = new URL(req.url);
    let value:string | null = searchParams.get("filter")
    if(!value){
      value = 'followers'
    }

    const {id} = await verifyToken(req)
    if(!id){
      return ErrorHandler("Unauthorized",401)
    }

    const connections = await User.find({_id: new mongoose.Types.ObjectId(id)}).select(value).populate(value,"username avatar")

    return NextResponse.json({
      success: true,
      message: "Connections fetched successfully",
      connections
    },{status:200})

  }catch (e) {
    if(e instanceof Error){
      return ErrorHandler(e.message,400)
    }
  }
}

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

  }catch(e){
    if(e instanceof Error){
      return ErrorHandler(e.message,400)
    }
  }
}