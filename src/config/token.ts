// src/config/token.ts
import jwt from "jsonwebtoken";

export interface JwtPayload {
  id: string;
  email: string;
  isAdmin: boolean;
  iat?: number;
  exp?: number;
}

/**
 * Генерация JWT
 * @param userId - ID пользователя
 * @param userEmail - Email пользователя
 * @param isAdmin - Является ли админом
 * @returns JWT токен
 */
export const generateToken = (userId: string, userEmail: string, isAdmin: boolean): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET не задан в .env");

  return jwt.sign({ id: userId, email: userEmail, isAdmin }, secret, {
    expiresIn: "7d",
  });
};

/**
 * Верификация JWT
 * @param token - токен
 * @returns payload или null
 */
export const verifyToken = (token: string): JwtPayload | null => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET не задан в .env");

  try {
    const decoded = jwt.verify(token, secret);

    if (!decoded || typeof decoded !== "object") return null;
    if (!("id" in decoded) || !("email" in decoded) || !("isAdmin" in decoded)) return null;

    return decoded as JwtPayload;
  } catch {
    return null;
  }
};


export default {
  generateToken,
  verifyToken,
};
