"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
// ===================== POST TOUR REVIEW =====================
const postTourReview = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { tourId, rating, comment, Images } = req.body;
        if (!userId)
            return res.status(401).json({ success: false, message: "Unauthorized" });
        if (!tourId || !rating)
            return res
                .status(400)
                .json({ success: false, message: "TourId и rating обязательны" });
        const existing = await prisma_1.default.review.findFirst({
            where: { userId, tourId },
        });
        if (existing)
            return res
                .status(400)
                .json({ success: false, message: "Вы уже оставили отзыв на этот тур" });
        const review = await prisma_1.default.review.create({
            data: { userId, tourId, rating, comment, Images },
            select: {
                id: true,
                rating: true,
                comment: true,
                Images: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
        res.status(201).json({ success: true, review });
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ success: false, message: "Ошибка при добавлении отзыва на тур" });
    }
};
// ===================== POST CAR REVIEW =====================
const postCarReview = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { carId, rating, comment, Images } = req.body;
        if (!userId)
            return res.status(401).json({ success: false, message: "Unauthorized" });
        if (!carId || !rating)
            return res
                .status(400)
                .json({ success: false, message: "CarId и rating обязательны" });
        const existing = await prisma_1.default.review.findFirst({
            where: { userId, carId },
        });
        if (existing)
            return res.status(400).json({
                success: false,
                message: "Вы уже оставили отзыв на эту машину",
            });
        const review = await prisma_1.default.review.create({
            data: { userId, carId, rating, comment, Images },
            select: {
                id: true,
                rating: true,
                comment: true,
                Images: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
        res.status(201).json({ success: true, review });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Ошибка при добавлении отзыва на машину",
        });
    }
};
// ===================== POST HOTEL REVIEW =====================
const postHotelReview = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { hotelId, rating, comment, Images } = req.body;
        if (!userId)
            return res.status(401).json({ success: false, message: "Unauthorized" });
        if (!hotelId || !rating)
            return res
                .status(400)
                .json({ success: false, message: "HotelId и rating обязательны" });
        const existing = await prisma_1.default.review.findFirst({
            where: { userId, hotelId },
        });
        if (existing)
            return res.status(400).json({
                success: false,
                message: "Вы уже оставили отзыв на этот отель",
            });
        const review = await prisma_1.default.review.create({
            data: { userId, hotelId, rating, comment, Images },
            select: {
                id: true,
                rating: true,
                comment: true,
                Images: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
        res.status(201).json({ success: true, review });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Ошибка при добавлении отзыва на отель",
        });
    }
};
// ===================== PUT REVIEW =====================
const putReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment, Images } = req.body;
        if (!rating && !comment && !Images) {
            return res
                .status(400)
                .json({ success: false, message: "Нет данных для обновления" });
        }
        const review = await prisma_1.default.review.findUnique({ where: { id } });
        if (!review)
            return res
                .status(404)
                .json({ success: false, message: "Отзыв не найден" });
        const updatedReview = await prisma_1.default.review.update({
            where: { id },
            data: {
                rating,
                comment,
                Images,
            },
        });
        res.status(200).json({ success: true, review: updatedReview });
    }
    catch (error) {
        console.error("Ошибка в putReview:", error);
        res
            .status(500)
            .json({ success: false, message: "Ошибка при обновлении отзыва" });
    }
};
// ===================== DELETE REVIEW =====================
const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await prisma_1.default.review.findUnique({ where: { id } });
        if (!review)
            return res
                .status(404)
                .json({ success: false, message: "Отзыв не найден" });
        await prisma_1.default.review.delete({ where: { id } });
        res.status(200).json({ success: true, message: "Отзыв удалён" });
    }
    catch (error) {
        console.error("Ошибка в deleteReview:", error);
        res
            .status(500)
            .json({ success: false, message: "Ошибка при удалении отзыва" });
    }
};
exports.default = {
    postCarReview,
    postTourReview,
    postHotelReview,
    putReview,
    deleteReview,
};
//# sourceMappingURL=review.controllers.js.map