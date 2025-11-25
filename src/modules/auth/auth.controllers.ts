import { Request, Response } from "express";
import prisma from "../../config/prisma";

 const signup = async (req: Request, res: Response) => {
  try {
    const newUser = await prisma.user.findMany();
    res.status(201).json({ success: true, newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export default { signup };
