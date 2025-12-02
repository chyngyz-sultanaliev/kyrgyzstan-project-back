"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHotelCategory = exports.updateHotelCategory = exports.createHotelCategory = exports.getHotelCategory = exports.getHotelCategories = exports.deleteCarCategory = exports.updateCarCategory = exports.createCarCategory = exports.getCarCategory = exports.getCarCategories = exports.deleteTourCategory = exports.updateTourCategory = exports.createTourCategory = exports.getTourCategory = exports.getTourCategories = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
//    TOUR CATEGORIES
// GET ALL
const getTourCategories = async (_req, res) => {
    try {
        const categories = await prisma_1.default.categoryTour.findMany({
            orderBy: { createdAt: "desc" },
        });
        return res.json(categories);
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Ошибка при получении категорий туров" });
    }
};
exports.getTourCategories = getTourCategories;
// GET ONE
const getTourCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma_1.default.categoryTour.findUnique({
            where: { id },
            include: { tours: true },
        });
        if (!category)
            return res.status(404).json({ message: "Категория тура не найдена" });
        return res.json(category);
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Ошибка при получении категории тура" });
    }
};
exports.getTourCategory = getTourCategory;
// CREATE
const createTourCategory = async (req, res) => {
    try {
        const { name, image } = req.body;
        if (!name)
            return res.status(400).json({ message: "Название обязательно" });
        const existing = await prisma_1.default.categoryTour.findFirst({ where: { name } });
        if (existing)
            return res
                .status(400)
                .json({ message: "Категория с таким названием уже существует" });
        const category = await prisma_1.default.categoryTour.create({
            data: { name, image: image ?? null },
        });
        return res.status(201).json(category);
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Ошибка при создании категории тура" });
    }
};
exports.createTourCategory = createTourCategory;
// UPDATE
const updateTourCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image } = req.body;
        const data = {};
        if (name !== undefined)
            data.name = name;
        if (image !== undefined)
            data.image = image ?? null;
        const category = await prisma_1.default.categoryTour.update({ where: { id }, data });
        return res.json(category);
    }
    catch (error) {
        console.error(error);
        if (error?.code === "P2025")
            return res.status(404).json({ message: "Категория тура не найдена" });
        return res
            .status(500)
            .json({ message: "Ошибка при обновлении категории тура" });
    }
};
exports.updateTourCategory = updateTourCategory;
// DELETE
const deleteTourCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.categoryTour.delete({ where: { id } });
        return res.json({ message: "Категория тура удалена" });
    }
    catch (error) {
        console.error(error);
        if (error?.code === "P2025")
            return res.status(404).json({ message: "Категория тура не найдена" });
        return res
            .status(500)
            .json({ message: "Ошибка при удалении категории тура" });
    }
};
exports.deleteTourCategory = deleteTourCategory;
//    CAR CATEGORIES
// GET ALL
const getCarCategories = async (_req, res) => {
    try {
        const categories = await prisma_1.default.categoryCar.findMany({
            orderBy: { createdAt: "desc" },
        });
        return res.json(categories);
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Ошибка при получении категорий машин" });
    }
};
exports.getCarCategories = getCarCategories;
// GET ONE
const getCarCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma_1.default.categoryCar.findUnique({
            where: { id },
            include: { cars: true },
        });
        if (!category)
            return res.status(404).json({ message: "Категория машины не найдена" });
        return res.json(category);
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Ошибка при получении категории машины" });
    }
};
exports.getCarCategory = getCarCategory;
// CREATE
const createCarCategory = async (req, res) => {
    try {
        const { name, images, seats, withDriver } = req.body;
        if (!name || seats == null)
            return res
                .status(400)
                .json({ message: "Название и количество мест обязательны" });
        const existing = await prisma_1.default.categoryCar.findFirst({ where: { name } });
        if (existing)
            return res
                .status(400)
                .json({ message: "Категория машины с таким названием уже существует" });
        const category = await prisma_1.default.categoryCar.create({
            data: {
                name,
                images: images ?? null,
                seats,
                withDriver: withDriver ?? false,
            },
        });
        return res.status(201).json(category);
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Ошибка при создании категории машины" });
    }
};
exports.createCarCategory = createCarCategory;
// UPDATE
const updateCarCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, images, seats, withDriver } = req.body;
        const data = {};
        if (name !== undefined)
            data.name = name;
        if (images !== undefined)
            data.images = images ?? null;
        if (seats !== undefined)
            data.seats = seats;
        if (withDriver !== undefined)
            data.withDriver = withDriver;
        const category = await prisma_1.default.categoryCar.update({ where: { id }, data });
        return res.json(category);
    }
    catch (error) {
        console.error(error);
        if (error?.code === "P2025")
            return res.status(404).json({ message: "Категория машины не найдена" });
        return res
            .status(500)
            .json({ message: "Ошибка при обновлении категории машины" });
    }
};
exports.updateCarCategory = updateCarCategory;
// DELETE
const deleteCarCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.categoryCar.delete({ where: { id } });
        return res.json({ message: "Категория машины удалена" });
    }
    catch (error) {
        console.error(error);
        if (error?.code === "P2025")
            return res.status(404).json({ message: "Категория машины не найдена" });
        return res
            .status(500)
            .json({ message: "Ошибка при удалении категории машины" });
    }
};
exports.deleteCarCategory = deleteCarCategory;
//    HOTEL CATEGORIES
// GET ALL
const getHotelCategories = async (_req, res) => {
    try {
        const categories = await prisma_1.default.categoryHotel.findMany({
            orderBy: { createdAt: "desc" },
        });
        return res.json(categories);
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Ошибка при получении категорий отелей" });
    }
};
exports.getHotelCategories = getHotelCategories;
// GET ONE
const getHotelCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma_1.default.categoryHotel.findUnique({
            where: { id },
            include: { hotels: true },
        });
        if (!category)
            return res.status(404).json({ message: "Категория отеля не найдена" });
        return res.json(category);
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Ошибка при получении категории отеля" });
    }
};
exports.getHotelCategory = getHotelCategory;
// CREATE
const createHotelCategory = async (req, res) => {
    try {
        const { name, image } = req.body;
        if (!name)
            return res.status(400).json({ message: "Название обязательно" });
        const existing = await prisma_1.default.categoryHotel.findFirst({ where: { name } });
        if (existing)
            return res
                .status(400)
                .json({ message: "Категория отеля с таким названием уже существует" });
        const category = await prisma_1.default.categoryHotel.create({
            data: { name, image: image ?? null },
        });
        return res.status(201).json(category);
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Ошибка при создании категории отеля" });
    }
};
exports.createHotelCategory = createHotelCategory;
// UPDATE
const updateHotelCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image } = req.body;
        const data = {};
        if (name !== undefined)
            data.name = name;
        if (image !== undefined)
            data.image = image ?? null;
        const category = await prisma_1.default.categoryHotel.update({ where: { id }, data });
        return res.json(category);
    }
    catch (error) {
        console.error(error);
        if (error?.code === "P2025")
            return res.status(404).json({ message: "Категория отеля не найдена" });
        return res
            .status(500)
            .json({ message: "Ошибка при обновлении категории отеля" });
    }
};
exports.updateHotelCategory = updateHotelCategory;
// DELETE
const deleteHotelCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.categoryHotel.delete({ where: { id } });
        return res.json({ message: "Категория отеля удалена" });
    }
    catch (error) {
        console.error(error);
        if (error?.code === "P2025")
            return res.status(404).json({ message: "Категория отеля не найдена" });
        return res
            .status(500)
            .json({ message: "Ошибка при удалении категории отеля" });
    }
};
exports.deleteHotelCategory = deleteHotelCategory;
exports.default = {
    getTourCategories: exports.getTourCategories,
    getTourCategory: exports.getTourCategory,
    createTourCategory: exports.createTourCategory,
    updateTourCategory: exports.updateTourCategory,
    deleteTourCategory: exports.deleteTourCategory,
    getCarCategories: exports.getCarCategories,
    getCarCategory: exports.getCarCategory,
    createCarCategory: exports.createCarCategory,
    updateCarCategory: exports.updateCarCategory,
    deleteCarCategory: exports.deleteCarCategory,
    getHotelCategories: exports.getHotelCategories,
    getHotelCategory: exports.getHotelCategory,
    createHotelCategory: exports.createHotelCategory,
    updateHotelCategory: exports.updateHotelCategory,
    deleteHotelCategory: exports.deleteHotelCategory,
};
//# sourceMappingURL=categoties.controllers.js.map