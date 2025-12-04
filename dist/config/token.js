"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
// src/config/token.ts
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
exports.default = {
    generateToken: exports.generateToken,
    verifyToken: exports.verifyToken,
};
//# sourceMappingURL=token.js.map