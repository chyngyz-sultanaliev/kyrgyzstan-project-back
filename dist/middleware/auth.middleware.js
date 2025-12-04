"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const token_1 = __importDefault(require("../config/token"));
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = token_1.default.verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: "Неверный или просроченный токен" });
        }
        const user = await prisma_1.default.user.findUnique({ where: { id: decoded.id } });
        if (!user) {
            return res.status(401).json({ message: "Пользователь не найден" });
        }
        req.user = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        };
        next();
    }
    catch (error) {
        console.error("Ошибка authMiddleware:", error);
        res.status(500).json({ message: "Ошибка сервера при проверке токена" });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map