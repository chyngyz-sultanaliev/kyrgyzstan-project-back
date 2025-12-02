"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../../config/prisma"));
const token_1 = __importDefault(require("../../config/token"));
const register = async (req, res) => {
    try {
        const { username, email, password, isAdmin } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Все поля обязательны для заполнения",
            });
        }
        const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Пользователь с таким email уже существует",
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = await prisma_1.default.user.create({
            data: {
                email,
                username,
                isAdmin,
                password: hashedPassword,
            },
        });
        const token = token_1.default.generateToken(newUser.id, newUser.email, newUser.isAdmin);
        res.status(201).json({
            success: true,
            message: "Пользователь успешно зарегистрирован",
            token,
            id: newUser.id,
            user: newUser.username,
        });
    }
    catch (error) {
        console.error("Ошибка register:", error);
        res.status(500).json({
            success: false,
            message: `${error}Ошибка на сервере, попробуйте позже`,
        });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Все поля обязательны для заполнения",
            });
        }
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user || !user.password) {
            return res.status(404).json({
                success: false,
                message: "Пользователь не найден",
            });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Неверный пароль",
            });
        }
        const token = token_1.default.generateToken(user.id, user.email, user.isAdmin);
        res.status(200).json({
            success: true,
            message: "Вход выполнен успешно",
            token,
            id: user.id,
            user: user.username,
        });
    }
    catch (error) {
        console.error("Ошибка login:", error);
        res.status(500).json({
            success: false,
            message: "Ошибка входа, попробуйте позже",
        });
    }
};
const profile = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const user = await prisma_1.default.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                email: true,
                avatar: true,
                createdAt: true,
                isAdmin: true,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Пользователь не найден",
            });
        }
        res.status(200).json({
            success: true,
            message: "Профиль успешно получен",
            user,
        });
    }
    catch (error) {
        console.error("Ошибка profile:", error);
        res.status(500).json({
            success: false,
            message: "Ошибка на сервере, попробуйте позже",
        });
    }
};
const update = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const { username, email, password, avatar } = req.body;
        if (!username || !email) {
            return res.status(400).json({
                success: false,
                message: "Поля username и email обязательны",
            });
        }
        const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser && existingUser.id !== userId) {
            return res.status(409).json({
                success: false,
                message: "Email уже используется другим пользователем",
            });
        }
        const updateData = { username, email };
        if (avatar)
            updateData.avatar = avatar;
        if (password && password.trim() !== "") {
            updateData.password = await bcryptjs_1.default.hash(password, 10);
        }
        const updatedUser = await prisma_1.default.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                username: true,
                email: true,
                avatar: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Профиль успешно обновлён",
            user: updatedUser,
        });
    }
    catch (error) {
        console.error("Ошибка update:", error);
        return res.status(500).json({
            success: false,
            message: "Ошибка сервера при обновлении профиля",
        });
    }
};
exports.default = { register, login, profile, update };
//# sourceMappingURL=auth.controllers.js.map