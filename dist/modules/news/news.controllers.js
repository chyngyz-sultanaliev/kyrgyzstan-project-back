"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
const getNews = async (req, res) => {
    try {
        const news = await prisma_1.default.news.findMany();
        return res.status(200).json({
            success: true,
            news,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: `Ошибка get News : ${error}`,
        });
    }
};
const postNews = async (req, res) => {
    try {
        const { title, content, image } = req.body;
        if (!title?.trim() || !content.trim() || !image?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Заполните обязательные поля",
            });
        }
        const findTitle = await prisma_1.default.news.findFirst({ where: { title } });
        if (findTitle) {
            return res.status(409).json({
                message: `Tакой news уже сушествует`,
            });
        }
        const news = await prisma_1.default.news.create({
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
    }
    catch (error) {
        return res.status(500).json({
            message: `Ошибка созданиу News : ${error}`,
        });
    }
};
const delNews = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: "Не передан ID новости." });
        }
        const existNews = await prisma_1.default.news.findFirst({
            where: { id },
        });
        if (!existNews) {
            return res.status(404).json({
                message: "Новость не найдена.",
            });
        }
        // Теперь удаляем
        await prisma_1.default.news.delete({
            where: { id },
        });
        return res.status(200).json({
            success: true,
            message: "Новость успешно удалена",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: `Ошибка удаления News: ${error}`,
        });
    }
};
exports.default = { getNews, postNews, delNews };
//# sourceMappingURL=news.controllers.js.map