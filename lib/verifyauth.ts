import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function verifyToken(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  console.log("token", token);

  if (!token) throw new Error("Unauthorized");
  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET KEY not provided");
  }

  const decode = jwt.verify(token, process.env.SECRET_KEY) as { id: string };

  return decode;
}
