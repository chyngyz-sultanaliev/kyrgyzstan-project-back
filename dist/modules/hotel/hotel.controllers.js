"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
const getHotel = async (req, res) => {
    try {
        const hotels = await prisma_1.default.hotel.findMany();
        return res.status(200).json({
            success: true,
            hotels,
        });
    }
    catch (error) {
        console.error("Ошибка при получении всех записей:", error);
        return res.status(500).json({
            success: false,
            error: `Ошибка при получении всех записей: ${error}`,
        });
    }
};
const getOneHotel = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID отеля не был передан.",
            });
        }
        const hotels = await prisma_1.default.hotel.findUnique({
            where: { id },
            include: {
                reviews: {
                    where: {
                        hotelId: id,
                    },
                    select: {
                        id: true,
                        rating: true,
                        comment: true,
                        Images: true,
                        createdAt: true,
                        user: {
                            select: {
                                username: true,
                                avatar: true,
                            },
                        },
                    },
                },
            },
        });
        if (!hotels) {
            return res.status(404).json({
                success: false,
                message: "Отель с таким ID не найден.",
            });
        }
        return res.status(200).json({
            success: true,
            hotels,
        });
    }
    catch (error) {
        console.error("Ошибка getHotelById:", error);
        return res.status(500).json({
            success: false,
            error: `Ошибка при получении отеля: ${error}`,
        });
    }
};
const postHotel = async (req, res) => {
    try {
        const { title, description, images, sleepingPlaces, maxGuests, area, floor, landArea, housingType, address, pool, sauna, billiard, tennis, playstation, music, wifi, priceWeekday, priceFriday, priceSaturday, priceSunday, fullWeekend, newYearPrice, januaryPrice, deposit, checkIn, checkOut, importantInfo, extraFee, reviews, categoryId, } = req.body;
        if (!title.trim() ||
            !description.trim() ||
            !Array.isArray(images) ||
            !address.trim()) {
            return res.status(400).json({
                message: "Заполните все обязательные поля!",
            });
        }
        const existingHotel = await prisma_1.default.hotel.findFirst({
            where: {
                title,
                address,
            },
        });
        if (existingHotel) {
            return res.status(400).json({
                success: false,
                message: "Такой отель уже существует!",
            });
        }
        const addHotel = await prisma_1.default.hotel.create({
            data: {
                title,
                description,
                images,
                sleepingPlaces,
                maxGuests,
                area,
                floor,
                landArea,
                housingType,
                address,
                pool,
                sauna,
                billiard,
                tennis,
                playstation,
                music,
                wifi,
                priceWeekday,
                priceFriday,
                priceSaturday,
                priceSunday,
                fullWeekend,
                newYearPrice,
                januaryPrice,
                deposit,
                checkIn,
                checkOut,
                importantInfo,
                extraFee,
                categoryId,
            },
        });
        return res.status(200).json({
            success: true,
            addHotel,
        });
    }
    catch (error) {
        console.error("Ошибка в postHotel:", error);
        return res.status(500).json({
            success: false,
            error: "Внутренняя ошибка сервера",
        });
    }
};
const updateHotel = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res
                .status(400)
                .json({ success: false, error: "Необходимо указать ID!!!" });
        }
        const allowedFields = [
            "title",
            "description",
            "images",
            "sleepingPlaces",
            "maxGuests",
            "area",
            "landArea",
            "floor",
            "housingType",
            "address",
            "pool",
            "sauna",
            "billiard",
            "tennis",
            "playstation",
            "music",
            "wifi",
            "priceWeekday",
            "priceFriday",
            "priceSaturday",
            "priceSunday",
            "fullWeekend",
            "newYearPrice",
            "januaryPrice",
            "deposit",
            "checkIn",
            "checkOut",
            "importantInfo",
            "extraFee",
        ];
        const dataToUpdate = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                dataToUpdate[field] = req.body[field];
            }
        }
        if (Object.keys(dataToUpdate).length === 0) {
            return res.status(400).json({
                success: false,
                error: "Нет полей для обновления",
            });
        }
        const updatedHotel = await prisma_1.default.hotel.update({
            where: { id },
            data: dataToUpdate,
        });
        res.status(200).json({ success: true, data: updatedHotel });
    }
    catch (error) {
        console.error("Ошибка при обновлении отеля:", error);
        res.status(500).json({
            success: false,
            error: `Ошибка при обновлении отеля: ${error}`,
        });
    }
};
const deleteHotel = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res
                .status(400)
                .json({ success: false, error: "Необходимо указать ID!" });
        }
        const existing = await prisma_1.default.hotel.findUnique({ where: { id } });
        if (!existing) {
            return res
                .status(404)
                .json({ success: false, error: "Отель не найден!" });
        }
        const deletedHotel = await prisma_1.default.hotel.delete({
            where: { id },
        });
        res.status(200).json({ success: true, data: deletedHotel });
    }
    catch (error) {
        console.error("Ошибка при удаление отеля:", error);
        res.status(500).json({
            success: false,
            error: error?.message || "Внутренняя ошибка сервера!",
        });
    }
};
exports.default = { getHotel, postHotel, updateHotel, deleteHotel, getOneHotel };
//# sourceMappingURL=hotel.controllers.js.map