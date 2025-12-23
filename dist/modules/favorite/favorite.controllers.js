"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
const getAll = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ success: false, message: "Unauthorized" });
        const favorites = await prisma_1.default.favorite.findMany({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Ошибка при получении избранного" });
    }
};
const addFavorite = async (req, res) => {
    const { itemId } = req.body;
    const userId = req.user?.id;
    if (!userId)
        return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!itemId)
        return res.status(400).json({ success: false, message: "itemId обязательны" });
    try {
        let item = null;
        let itemType = null;
        // Ищем элемент в каждой таблице
        item = await prisma_1.default.tour.findUnique({ where: { id: itemId } });
        if (item)
            itemType = "TOUR";
        if (!item) {
            item = await prisma_1.default.car.findUnique({ where: { id: itemId } });
            if (item)
                itemType = "CAR";
        }
        if (!item) {
            item = await prisma_1.default.hotel.findUnique({ where: { id: itemId } });
            if (item)
                itemType = "HOTEL";
        }
        if (!itemType)
            return res.status(404).json({ message: "Элемент не найден" });
        // Проверяем, есть ли уже в избранном
        const existingFavorite = await prisma_1.default.favorite.findFirst({
            where: {
                userId,
                OR: [
                    { tourId: itemType === "TOUR" ? itemId : undefined },
                    { carId: itemType === "CAR" ? itemId : undefined },
                    { hotelId: itemType === "HOTEL" ? itemId : undefined },
                ],
            },
        });
        if (existingFavorite) {
            return res.status(400).json({ success: false, message: "Элемент уже в избранном" });
        }
        // Создаём favorite
        const data = { userId, itemType };
        if (itemType === "TOUR")
            data.tourId = itemId;
        if (itemType === "CAR")
            data.carId = itemId;
        if (itemType === "HOTEL")
            data.hotelId = itemId;
        const newFavorite = await prisma_1.default.favorite.create({ data });
        return res.status(201).json({
            id: newFavorite.id,
            itemType: newFavorite.itemType,
            createdAt: newFavorite.createdAt,
            item,
        });
    }
    catch (error) {
        console.error("Ошибка addFavorite:", error);
        return res.status(500).json({ error: "Ошибка при добавлении в избранное" });
    }
};
const removeFavorite = async (req, res) => {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({ success: false, message: "ID обязателен" });
    try {
        const favorite = await prisma_1.default.favorite.findUnique({ where: { id } });
        if (!favorite)
            return res.status(404).json({ error: "Избранное не найдено" });
        await prisma_1.default.favorite.delete({ where: { id } });
        return res.status(200).json({ success: true });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Ошибка при удалении" });
    }
};
exports.default = { getAll, addFavorite, removeFavorite };
//# sourceMappingURL=favorite.controllers.js.map