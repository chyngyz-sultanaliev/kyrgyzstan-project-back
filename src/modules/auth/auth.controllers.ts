import { Request, Response } from "express";
import prisma from "../../config/prisma";
import bcrypt from "bcryptjs";

const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password,
      },
    });

    res.status(201).json({ success: true, user: { id: newUser.id, email: newUser.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export default { signup };
