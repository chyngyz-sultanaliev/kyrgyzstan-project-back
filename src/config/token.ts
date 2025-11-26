import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

const generateToken = (userId: string, userEmail: string, isAdmin:boolean) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET не задан в .env");
  }

  return jwt.sign({ id: userId, email: userEmail , isAdmin}, secret, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string): JwtPayload | null => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET не задан в .env");

  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded !== "object" || decoded === null) return null;
    if (!("id" in decoded) || !("email" in decoded)) return null;

    return decoded as JwtPayload;
  } catch {
    return null;
  }
};

export default {
  generateToken,
  verifyToken,
};
