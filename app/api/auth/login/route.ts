import { NextRequest, NextResponse } from "next/server";
import { loginValidation } from "@/validations/auth.validation";
import { ErrorHandler } from "@/lib/errorHandler";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDb from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const body = await req.json();

    const validationResult = loginValidation.safeParse(body);

    if (!validationResult.success) {
      return ErrorHandler(validationResult.error.issues[0].message, 400);
    }

    const { email, password } = validationResult.data;

    const user = await User.findOne({ email });

    if (!user) {
      return ErrorHandler("User not found", 400);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return ErrorHandler("Incorrect password ! ", 400);
    }

    if (!process.env.SECRET_KEY) {
      return ErrorHandler("Currently server down", 500);
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "7d" },
    );

    const userObj = user.toObject();

    delete userObj.password;

    const response = NextResponse.json({
      message: "Login Successfully",
    });

    response.cookies.set("token", token, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      return ErrorHandler(error.message, 400);
    }
  }
}
