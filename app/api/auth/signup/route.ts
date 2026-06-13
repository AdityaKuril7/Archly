import {NextRequest, NextResponse} from "next/server";
import {signupValidation} from "@/validations/auth.validation";
import {ErrorHandler} from "@/lib/errorHandler";
import User from "@/models/user.model";
import connectDb from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req:NextRequest){
    try{
        await connectDb();
        const body = await req.json()
        const validationResult = await signupValidation.safeParse(body)

        if(!validationResult.success){
            return ErrorHandler(validationResult.error.issues[0].message,400)
        }

        const {username,email,password} = validationResult.data;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({username,email,password:hashedPassword})

        const userObj = user.toObject()

        delete userObj.password;

        return NextResponse.json({
            success:true,
            message:"User registered successfully",
            data: userObj
        },{status: 201})
    }catch(error){
        if(error instanceof Error){
            return ErrorHandler(error.message,400)
        }
    }
}