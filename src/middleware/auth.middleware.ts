import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";
import Verify from "../config/token"

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      email: string;
      isAdmin: boolean;
    };
  }
}


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const decoded =  Verify.verifyToken(token);
  if (!decoded) return res.status(401).json({ message: "Неверный или просроченный токен" });

  const user = await prisma.user.findUnique({ where: { id: decoded.id } });
  if (!user) return res.status(401).json({ message: "Пользователь не найден" });

  req.user = { id: user.id, email: user.email, isAdmin: user.isAdmin };
  next();
};
