import { Request, Response } from "express";
import prisma from "../../config/prisma";
import { FavoriteItemType } from "@prisma/client";

const getAll = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        tour: true,
        car: true,
        hotel: true,
      },
    });

    // Формируем единый объект item
    const result = favorites.map(fav => {
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

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка при получении избранного" });
  }
};

const addFavorite = async (req: Request, res: Response) => {
  const { itemId } = req.body;
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });
  if (!itemId) return res.status(400).json({ success: false, message: "itemId обязательны" });

  try {
    let itemType: "TOUR" | "CAR" | "HOTEL" | null = null;

    // Определяем тип элемента по его существованию в базе
    let item = await prisma.tour.findUnique({ where: { id: itemId } });
    if (item) itemType = "TOUR";

    if (!item) {
    let  item = await prisma.car.findUnique({ where: { id: itemId } });
      if (item) itemType = "CAR";
    }

    if (!item) {
     let item = await prisma.hotel.findUnique({ where: { id: itemId } });
      if (item) itemType = "HOTEL";
    }

    if (!itemType) return res.status(404).json({ message: "Элемент не найден" });

    // Создаём favorite
    const data: any = { userId, itemType };
    if (itemType === "TOUR") data.tourId = itemId;
    if (itemType === "CAR") data.carId = itemId;
    if (itemType === "HOTEL") data.hotelId = itemId;

    const newFavorite = await prisma.favorite.create({ data });

    return res.status(201).json({
      id: newFavorite.id,
      itemType: newFavorite.itemType,
      createdAt: newFavorite.createdAt,
      item,
    });
  } catch (error) {
    console.error("Ошибка addFavorite:", error);
    return res.status(500).json({ error: "Ошибка при добавлении в избранное" });
  }
};


const removeFavorite = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ success: false, message: "ID обязателен" });

  try {
    const favorite = await prisma.favorite.findUnique({ where: { id } });
    if (!favorite) return res.status(404).json({ error: "Избранное не найдено" });

    await prisma.favorite.delete({ where: { id } });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка при удалении" });
  }
};

export default { getAll, addFavorite, removeFavorite };
