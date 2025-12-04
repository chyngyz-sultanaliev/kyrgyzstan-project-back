import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../config/prisma";
import generatedToken from "../../config/token";
import { sendEmail } from "../../config/email.service";

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, isAdmin } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Все поля обязательны для заполнения",
      });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Пользователь с таким email уже существует",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, username, isAdmin, password: hashedPassword },
    });

    const token = generatedToken.generateToken(
      newUser.id,
      newUser.email,
      newUser.isAdmin
    );

    res.status(201).json({
      success: true,
      message: "Пользователь успешно зарегистрирован",
      id: newUser.id,
      user: newUser.username,
      token,
    });
  } catch (error) {
    console.error("Ошибка register:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка на сервере, попробуйте позже",
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Все поля обязательны для заполнения",
      });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res
        .status(404)
        .json({ success: false, message: "Пользователь не найден" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Неверный пароль" });
    }

    const token = generatedToken.generateToken(
      user.id,
      user.email,
      user.isAdmin
    );
    res.status(200).json({
      success: true,
      message: "Вход выполнен успешно",
      id: user.id,
      user: user.username,
      token,
    });
  } catch (error) {
    console.error("Ошибка login:", error);
    res
      .status(500)
      .json({ success: false, message: "Ошибка входа, попробуйте позже" });
  }
};

const profile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        createdAt: true,
        isAdmin: true,
        favorites: {
          orderBy: { createdAt: "desc" },
          include: { tour: true, car: true, hotel: true },
        },
      },
    });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Пользователь не найден" });

    const favorites = user.favorites.map((fav) => {
      let item = null;
      switch (fav.itemType) {
        case "TOUR":
          item = fav.tour;
          break;
        case "CAR":
          item = fav.car;
          break;
        case "HOTEL":
          item = fav.hotel;
          break;
      }
      return {
        id: fav.id,
        itemType: fav.itemType,
        createdAt: fav.createdAt,
        item,
      };
    });

    res.status(200).json({
      success: true,
      message: "Профиль успешно получен",
      user: { ...user, favorites },
    });
  } catch (error) {
    console.error("Ошибка profile:", error);
    res
      .status(500)
      .json({ success: false, message: "Ошибка на сервере, попробуйте позже" });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const { username, email, password, avatar } = req.body;
    if (!username || !email)
      return res
        .status(400)
        .json({ success: false, message: "Поля username и email обязательны" });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser && existingUser.id !== userId)
      return res.status(409).json({
        success: false,
        message: "Email уже используется другим пользователем",
      });

    const updateData: Record<string, any> = { username, email };
    if (avatar) updateData.avatar = avatar;
    if (password && password.trim() !== "")
      updateData.password = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Профиль успешно обновлён",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Ошибка update:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка сервера при обновлении профиля",
    });
  }
};

const requestResetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email обязателен" });

  try {
    // Находим пользователя по email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(404).json({ message: "Пользователь не найден" });

    // Генерируем 6-значный код
    const token = uuidv4().slice(0, 6);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 минут

    // Сохраняем токен в базе данных
    await prisma.resetPasswordToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    // Формируем письмо
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f7;">
        <div style="max-width: 500px; margin: 0 auto; background: #fff; border-radius: 10px; padding: 30px;">
          <h2 style="text-align:center; color:#333;">Сброс пароля</h2>
          <p style="color:#555; font-size:15px;">Вы запросили сброс пароля. Используйте код ниже:</p>
          <div style="text-align:center; margin:20px 0;">
            <span style="font-size:28px; font-weight:bold; letter-spacing:6px; background:#f0f0f0; padding:15px 25px; border-radius:8px;">${token}</span>
          </div>
          <p style="color:#555; font-size:14px;">Код действителен <strong>15 минут</strong>.<br>Если вы не запрашивали сброс пароля — проигнорируйте письмо.</p>
          <hr style="margin:30px 0; border:none; border-top:1px solid #eee;" />
          <p style="color:#888; font-size:12px; text-align:center;">Это письмо отправлено автоматически. Не отвечайте на него.</p>
        </div>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: "Код для сброса пароля",
      text: `Ваш код: ${token}`,
      html,
    });

    res.status(200).json({ message: "Код отправлен на email" });
  } catch (error) {
    console.error("Ошибка requestResetPassword:", error);
    res.status(500).json({ message: "Ошибка сервера, попробуйте позже" });
  }
};

const verifyResetCode = async (req: Request, res: Response) => {
  try {
    const { email, token } = req.body;
    if (!email || !token)
      return res.status(400).json({ message: "Email и код обязательны" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(404).json({ message: "Пользователь не найден" });

    const record = await prisma.resetPasswordToken.findFirst({
      where: {
        userId: user.id,
        token,
        used: false,
        expiresAt: { gt: new Date() },
      },
    });
    if (!record)
      return res.status(400).json({ message: "Неверный или просроченный код" });

    res.status(200).json({ message: "Код верный" });
  } catch (error) {
    console.error("Ошибка verifyResetCode:", error);
    res.status(500).json({ message: "Ошибка на сервере, попробуйте позже" });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, token, newPassword } = req.body;
    if (!email || !token || !newPassword)
      return res.status(400).json({ message: "Все поля обязательны" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(404).json({ message: "Пользователь не найден" });

    const record = await prisma.resetPasswordToken.findFirst({
      where: {
        userId: user.id,
        token,
        used: false,
        expiresAt: { gt: new Date() },
      },
    });
    if (!record)
      return res.status(400).json({ message: "Неверный или просроченный код" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
    await prisma.resetPasswordToken.update({
      where: { id: record.id },
      data: { used: true },
    });

    res.status(200).json({ message: "Пароль успешно обновлён" });
  } catch (error) {
    console.error("Ошибка resetPassword:", error);
    res.status(500).json({ message: "Ошибка на сервере, попробуйте позже" });
  }
};

export default {
  register,
  login,
  profile,
  update,
  requestResetPassword,
  resetPassword,
  verifyResetCode,
};
