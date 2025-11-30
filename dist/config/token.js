"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId, userEmail, isAdmin) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET не задан в .env");
    }
    return jsonwebtoken_1.default.sign({ id: userId, email: userEmail, isAdmin }, secret, {
        expiresIn: "7d",
    });
};
const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error("JWT_SECRET не задан в .env");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (typeof decoded !== "object" || decoded === null)
            return null;
        if (!("id" in decoded) || !("email" in decoded))
            return null;
        return decoded;
    }
    catch {
        return null;
    }
};
exports.verifyToken = verifyToken;
exports.default = {
    generateToken,
    verifyToken: exports.verifyToken,
};
//# sourceMappingURL=token.js.map