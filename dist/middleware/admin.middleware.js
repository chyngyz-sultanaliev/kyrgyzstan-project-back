"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const adminMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Не авторизован" });
    }
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Доступ запрещён. Только для админов." });
    }
    next();
};
exports.adminMiddleware = adminMiddleware;
//# sourceMappingURL=admin.middleware.js.map