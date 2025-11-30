"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
const getTour = async (req, res) => {
    try {
        const tour = await prisma_1.default.tour.findMany({
            include: {
                reviews: {
                    where: {
                        tourId: { not: null },
                    },
                    select: {
                        id: true,
                        rating: true,
                        comment: true,
                        Images: true,
                        createdAt: true,
                        user: {
                            select: { username: true, avatar: true },
                        },
                    },
                },
                tourDays: true,
            },
        });
        res.status(200).json({
            success: true,
            tour,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: `Error in getTour: ${error}`,
        });
    }
};
const postTour = async (req, res) => {
    try {
        const { title, description, image, location, seaLevel, walk, byCar, days, price, categoryId, } = req.body;
        if (!title.trim()) {
            return res.status(401).json({
                success: false,
                message: "Названия обязательное!!!",
            });
        }
        // Проверка: такой тур уже есть?
        const exists = await prisma_1.default.tour.findFirst({
            where: { title },
        });
        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Такой тур уже существует!",
            });
        }
        const addTour = await prisma_1.default.tour.create({
            data: {
                title,
                description,
                image,
                location,
                seaLevel,
                walk,
                byCar,
                days,
                price,
                categoryId,
            },
        });
        return res.status(201).json({
            success: true,
            data: addTour,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error in postTour: ${error}`,
        });
    }
};
const putTour = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image, location, seaLevel, walk, byCar, days, price, categoryId, } = req.body;
        // 1) Проверяем, существует ли тур
        const exists = await prisma_1.default.tour.findUnique({
            where: { id },
        });
        if (!exists) {
            return res.status(404).json({
                success: false,
                message: "Тур с таким ID не найден!",
            });
        }
        // 2) Обновляем
        const updatedTour = await prisma_1.default.tour.update({
            where: { id },
            data: {
                title,
                description,
                image,
                location,
                seaLevel,
                walk,
                byCar,
                days,
                price,
                categoryId,
            },
        });
        return res.status(200).json({
            success: true,
            data: updatedTour,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Ошибка при обновлении тура: ${error}`,
        });
    }
};
const deleteTour = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Не передан tourId!!!",
            });
        }
        const exists = await prisma_1.default.tour.findUnique({
            where: { id },
        });
        if (!exists) {
            return res.status(404).json({
                success: false,
                message: "Тур с таким ID не найдена!!!",
            });
        }
        const delTour = await prisma_1.default.tour.delete({
            where: { id },
        });
        return res.status(200).json({
            success: true,
            message: "Тур успешно удалён!!!",
            delTour,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `Ошибка при удалении: ${error}`,
        });
    }
};
// TOUR-DAY
const getTourDay = async (req, res) => {
    try {
        const tourDay = await prisma_1.default.tourDay.findMany();
        return res.status(200).json({
            success: true,
            data: tourDay,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error in getTourDay: ${error}`,
        });
    }
};
const postTourDay = async (req, res) => {
    try {
        const { dayNumber, description, tourId } = req.body;
        if (dayNumber == null || !description?.trim() || !tourId?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Обязательные поля!!!",
            });
        }
        const addDay = await prisma_1.default.tourDay.create({
            data: {
                dayNumber,
                description,
                tourId,
            },
        });
        return res.status(200).json({
            success: true,
            data: addDay,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error in postTourDay: ${error}`,
        });
    }
};
const putTourDay = async (req, res) => {
    try {
        const { id } = req.params;
        const { dayNumber, description, tourId } = req.body;
        const exists = await prisma_1.default.tourDay.findUnique({
            where: { id },
        });
        if (!exists) {
            return res.status(404).json({
                success: false,
                message: "TourDay с таким ID не найден!",
            });
        }
        const updatedTourDay = await prisma_1.default.tourDay.update({
            where: { id },
            data: {
                dayNumber,
                description,
                tourId,
            },
        });
        return res.status(200).json({
            success: true,
            data: updatedTourDay,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error in putTourday: ${error}`,
        });
    }
};
const deleteTourday = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Не передан tourdayId!!!",
            });
        }
        const exists = await prisma_1.default.tourDay.findUnique({
            where: { id },
        });
        if (!exists) {
            return res.status(404).json({
                success: false,
                message: "TourDay с таким ID не найдена!!!",
            });
        }
        const delTour = await prisma_1.default.tourDay.delete({
            where: { id },
        });
        return res.status(200).json({
            success: true,
            message: "TourDay успешно удалён!!!",
            delTour,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `Ошибка при удалении: ${error}`,
        });
    }
};
exports.default = {
    getTour,
    postTour,
    putTour,
    deleteTour,
    getTourDay,
    postTourDay,
    putTourDay,
    deleteTourday,
};
//# sourceMappingURL=tour.controllers.js.map