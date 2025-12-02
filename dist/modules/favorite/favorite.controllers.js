"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
const getAll = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const favorites = await prisma_1.default.favorite.findMany({
            where: { userId },
            select: {
                id: true,
                itemType: true,
                itemId: true,
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
        });
        const result = await Promise.all(favorites.map(async (fav) => {
            let item = null;
            switch (fav.itemType) {
                case "TOUR":
                    item = await prisma_1.default.tour.findUnique({ where: { id: fav.itemId } });
                    break;
                case "CAR":
                    item = await prisma_1.default.car.findUnique({ where: { id: fav.itemId } });
                    break;
                case "HOTEL":
                    item = await prisma_1.default.hotel.findUnique({ where: { id: fav.itemId } });
                    break;
            }
            // убираем itemId
            const { itemId, ...cleaned } = fav;
            return { ...cleaned, item };
        }));
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
        let itemType = null;
        const tour = await prisma_1.default.tour.findUnique({ where: { id: itemId } });
        if (tour)
            itemType = "TOUR";
        const car = await prisma_1.default.car.findUnique({ where: { id: itemId } });
        if (!itemType && car)
            itemType = "CAR";
        const hotel = await prisma_1.default.hotel.findUnique({ where: { id: itemId } });
        if (!itemType && hotel)
            itemType = "HOTEL";
        if (!itemType) {
            return res.status(404).json({
                success: false,
                message: "Элемент с таким ID не найден среди TOUR/CAR/HOTEL",
            });
        }
        const newFavorite = await prisma_1.default.favorite.create({
            data: { userId, itemId, itemType },
        });
        res.status(201).json(newFavorite);
    }
    catch (error) {
        res.status(500).json({ error: "Ошибка при добавлении в избранное" });
    }
};
const removeFavorite = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ success: false, message: "ID обязателен" });
    }
    try {
        const favorite = await prisma_1.default.favorite.findUnique({
            where: { id },
        });
        if (!favorite) {
            return res.status(404).json({ error: "Избранное не найдено" });
        }
        await prisma_1.default.favorite.delete({
            where: { id },
        });
        return res.status(200).json({ success: true });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Ошибка при удалении" });
    }
};
exports.default = { getAll, addFavorite, removeFavorite };
//# sourceMappingURL=favorite.controllers.js.map