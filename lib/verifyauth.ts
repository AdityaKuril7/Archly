import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { ErrorHandler } from "./errorHandler";

export async function verifyToken(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) return ErrorHandler("Unauthorized", 401);

  if (!process.env.SECRET_KEY) {
    return console.log("Missing Secret key");
  }

  const decode = jwt.verify(token, process.env.SECRET_KEY) as { id: string };

  return decode;
}
