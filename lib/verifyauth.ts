import jwt from "jsonwebtoken";

export async function verifyToken(token: string) {
  if (!process.env.SECRET_KEY) {
    return console.log("Missing Secret key");
  }

  const decode = jwt.verify(token, process.env.SECRET_KEY) as { id: string };

  return decode;
}
