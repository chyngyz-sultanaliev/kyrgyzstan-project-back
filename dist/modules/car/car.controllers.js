"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
const getCar = async (req, res) => {
    try {
        const cars = await prisma_1.default.car.findMany();
        res.status(200).json({ success: true, cars });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error in getCar" });
    }
};
const getOneCar = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID машины не был передан.",
            });
        }
        const cars = await prisma_1.default.hotel.findUnique({
            where: { id },
            include: {
                reviews: {
                    where: {
                        carId: { not: null },
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
            },
        });
        if (!cars) {
            return res.status(404).json({
                success: false,
                message: "Машина с таким ID не найден.",
            });
        }
        return res.status(200).json({
            success: true,
            cars,
        });
    }
    catch (error) {
        console.error("Ошибка getHotelById:", error);
        return res.status(500).json({
            success: false,
            error: `Ошибка при получении машины: ${error}`,
        });
    }
};
const postCar = async (req, res) => {
    try {
        const { title, description, image, transmission, seat, year, engine, drive, fuelType, pricePerDay, minDriverAge, categoryId, withDriver, } = req.body;
        if (!title?.trim() || !seat || !pricePerDay || !categoryId?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Заполните обязательные поля",
            });
        }
        const existingCar = await prisma_1.default.car.findFirst({
            where: { title, year, pricePerDay, categoryId },
        });
        if (existingCar) {
            return res.status(409).json({
                success: false,
                message: "Такой автомобиль уже существует",
            });
        }
        const newCar = await prisma_1.default.car.create({
            data: {
                title,
                description,
                image,
                transmission,
                seat,
                year,
                engine,
                drive,
                fuelType,
                pricePerDay,
                minDriverAge,
                categoryId,
                withDriver,
            },
        });
        return res.status(201).json({ success: true, data: newCar });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error in postCar: ${error.message || error}`,
        });
    }
};
const deleteCar = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id)
            return res
                .status(400)
                .json({ success: false, message: "Не передан carId" });
        const exists = await prisma_1.default.car.findUnique({ where: { id } });
        if (!exists)
            return res
                .status(404)
                .json({ success: false, message: "Машина с таким ID не найдена" });
        const deleted = await prisma_1.default.car.delete({ where: { id } });
        return res.status(200).json({
            success: true,
            message: "Машина успешно удалена",
            data: deleted,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `Ошибка при удалении: ${error.message}`,
        });
    }
};
const putCar = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res
                .status(400)
                .json({ success: false, message: "Car id обязателен" });
        const { title, year, pricePerDay, categoryId } = req.body;
        // Дубликат текшерүү
        const existingCar = await prisma_1.default.car.findFirst({
            where: {
                title,
                year,
                pricePerDay,
                categoryId,
                NOT: { id },
            },
        });
        if (existingCar) {
            return res
                .status(409)
                .json({ success: false, message: "Такой автомобиль уже существует" });
        }
        const updatedCar = await prisma_1.default.car.update({
            where: { id },
            data: { ...req.body },
        });
        return res.status(200).json({ success: true, car: updatedCar });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `Ошибка при обновлении данных: ${error.message}`,
        });
    }
};
exports.default = { getCar, postCar, deleteCar, putCar, getOneCar };
//# sourceMappingURL=car.controllers.js.map