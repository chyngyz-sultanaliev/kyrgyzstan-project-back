import { Request, Response } from "express";
import prisma from "../../config/prisma";

const getNews = async (req: Request, res: Response) => {
  try {
    const news = await prisma.news.findMany();
    return res.status(200).json({
      success: true,
      news,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Ошибка get News : ${error}`,
    });
  }
};

const postNews = async (req: Request, res: Response) => {
  try {
    const { title, content, image } = req.body;
    if (!title?.trim() || !content.trim() || !image?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Заполните обязательные поля",
      });
    }
    const findTitle = await prisma.news.findFirst({ where: { title } });
    if (findTitle) {
      return res.status(409).json({
        message: `Tакой news уже сушествует`,
      });
    }
    const news = await prisma.news.create({
      data: {
        title,
        content,
        image,
      },
    });
    return res.status(201).json({
      success: true,
      news,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Ошибка созданиу News : ${error}`,
    });
  }
};

const delNews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ message: "Не передан ID новости." });
    }
    const existNews = await prisma.news.findFirst({
      where: { id },
    });

    if (!existNews) {
      return res.status(404).json({
        message: "Новость не найдена.",
      });
    }

    // Теперь удаляем
    await prisma.news.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Новость успешно удалена",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Ошибка удаления News: ${error}`,
    });
  }
};

export default { getNews, postNews, delNews };
