import { Request, Response } from "express";
import prisma from "../../config/prisma";
import { FavoriteItemType } from "@prisma/client";

const getAll = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      select: {
        id: true,
        itemType: true,
        itemId: true,   
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const result = await Promise.all(
      favorites.map(async (fav) => {
        let item = null;

        switch (fav.itemType) {
          case "TOUR":
            item = await prisma.tour.findUnique({ where: { id: fav.itemId } });
            break;
          case "CAR":
            item = await prisma.car.findUnique({ where: { id: fav.itemId } });
            break;
          case "HOTEL":
            item = await prisma.hotel.findUnique({ where: { id: fav.itemId } });
            break;
        }

        // убираем itemId
        const { itemId, ...cleaned } = fav;

        return { ...cleaned, item };
      })
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка при получении избранного" });
  }
};

const addFavorite = async (req: Request, res: Response) => {
  const { itemId } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (!itemId) {
    return res.status(400).json({
      success: false,
      message: "itemId обязателен",
    });
  }

  try {
    // Определяем тип
    let itemType: FavoriteItemType | null = null;

    const tour = await prisma.tour.findUnique({ where: { id: itemId } });
    if (tour) itemType = "TOUR";

    const car = await prisma.car.findUnique({ where: { id: itemId } });
    if (!itemType && car) itemType = "CAR";

    const hotel = await prisma.hotel.findUnique({ where: { id: itemId } });
    if (!itemType && hotel) itemType = "HOTEL";

    if (!itemType) {
      return res.status(404).json({
        success: false,
        message: "Элемент с таким ID не найден среди TOUR/CAR/HOTEL",
      });
    }

    const newFavorite = await prisma.favorite.create({
      data: { userId, itemId, itemType },
    });

    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при добавлении в избранное" });
  }
};
const removeFavorite = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: "ID обязателен" });
  }

  try {
    const favorite = await prisma.favorite.findUnique({
      where: { id },
    });

    if (!favorite) {
      return res.status(404).json({ error: "Избранное не найдено" });
    }

    await prisma.favorite.delete({
      where: { id },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка при удалении" });
  }
};

export default { getAll, addFavorite, removeFavorite };
