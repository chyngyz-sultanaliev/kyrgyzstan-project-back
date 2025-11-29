"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
const getCar = async (req, res) => {
    try {
        const car = await prisma_1.default.car.findMany();
        res.status(200).json({
            success: true,
            car,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in getCar",
        });
    }
};
const postCar = async (req, res) => {
    try {
        const { title, description, image, transmission, seat, year, engine, drive, fuelType, pricePerDay, minDriverAge, categoryId, withDriver, } = req.body;
        const addCar = await prisma_1.default.car.create({
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
        return res.status(200).json({
            success: true,
            data: addCar,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error in postCar: ${error}`,
        });
    }
};
const deleteCar = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Не передан carId",
            });
        }
        const exists = await prisma_1.default.car.findUnique({
            where: { id },
        });
        if (!exists) {
            return res.status(404).json({
                success: false,
                message: "Машина с таким ID не найдена",
            });
        }
        const deleted = await prisma_1.default.car.delete({
            where: { id },
        });
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
        const { id } = req.body;
        const { title, description, image, transmission, seat, year, engine, drive, fuelType, pricePerDay, minDriverAge, categoryId, withDriver, } = req.body;
        const index = await prisma_1.default.car.update({
            where: { id },
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
        res.status(200).json({
            success: true,
            index,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Ошибка при обнавлении данных: ${error}`,
        });
    }
};
const patchCar = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res
                .status(400)
                .json({ success: false, message: "Car id обязателен" });
        }
        const updatedData = { ...req.body };
        const updatedCar = await prisma_1.default.car.update({
            where: { id },
            data: updatedData,
        });
        res.status(200).json({
            success: true,
            car: updatedCar,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Ошибка при обновлении данных: ${error.message || error}`,
        });
    }
};
const crudAllCar = (req, res) => {
    try {
    }
    catch (error) { }
};
exports.default = {
    getCar,
    postCar,
    deleteCar,
    putCar,
    patchCar,
};
//# sourceMappingURL=car.controllers.js.map