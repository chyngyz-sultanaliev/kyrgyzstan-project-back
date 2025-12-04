"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResetToken = exports.verifyToken = exports.generateToken = void 0;
// src/config/token.ts
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Генерация JWT
 * @param userId - ID пользователя
 * @param userEmail - Email пользователя
 * @param isAdmin - Является ли админом
 * @returns JWT токен
 */
const generateToken = (userId, userEmail, isAdmin) => {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error("JWT_SECRET не задан в .env");
    return jsonwebtoken_1.default.sign({ id: userId, email: userEmail, isAdmin }, secret, {
        expiresIn: "7d",
    });
};
exports.generateToken = generateToken;
/**
 * Верификация JWT
 * @param token - токен
 * @returns payload или null
 */
const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error("JWT_SECRET не задан в .env");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (!decoded || typeof decoded !== "object")
            return null;
        if (!("id" in decoded) || !("email" in decoded) || !("isAdmin" in decoded))
            return null;
        return decoded;
    }
    catch {
        return null;
    }
};
exports.verifyToken = verifyToken;
/**
 * Генерация безопасного кода для сброса пароля (6 символов HEX)
 */
const generateResetToken = () => {
    return crypto_1.default.randomBytes(3).toString("hex"); // 6 символов
};
exports.generateResetToken = generateResetToken;
exports.default = {
    generateToken: exports.generateToken,
    verifyToken: exports.verifyToken,
    generateResetToken: exports.generateResetToken,
};
//# sourceMappingURL=token.js.map