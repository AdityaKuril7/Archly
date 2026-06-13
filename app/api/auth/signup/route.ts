import {NextRequest, NextResponse} from "next/server";
import {signupValidation} from "@/validations/auth.validation";
import {ErrorHandler} from "@/lib/errorHandler";
import User from "@/models/user.model";

export async function POST(req:NextRequest){
    try{
        const validationResult = await signupValidation.safeParse(req.body)

        if(!validationResult.success){
            return ErrorHandler(validationResult.error.issues[0].message,400)
        }

        const {username,email,password} = validationResult.data;

        const user = User.create({username,email,password})

        return NextResponse.json({
            success:true,
            message:"User registered successfully",
            data: user
        },{status: 201})
    }catch(error){
        if(error instanceof Error){
            return ErrorHandler(error.message,400)
        }
    }

}