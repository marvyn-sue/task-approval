import jwt from "jsonwebtoken";

export interface MyTokenPayload extends jwt.JwtPayload {
  taskId: string;
}

const SECRET = process.env.JWT_SECRET as string;

export function generateToken(id: string) {
  return jwt.sign({ id }, SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
  try {
    jwt.verify(token, SECRET) as MyTokenPayload;

    return true;
  } catch (error) {
    return false;
  }
}
