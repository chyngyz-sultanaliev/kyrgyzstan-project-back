"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_controllers_1 = __importDefault(require("./news.controllers"));
const admin_middleware_1 = require("../../middleware/admin.middleware");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const newsRoutes = (0, express_1.Router)();
newsRoutes.get("/", news_controllers_1.default.getNews);
newsRoutes.post("/", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, news_controllers_1.default.postNews);
newsRoutes.delete("/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, news_controllers_1.default.delNews);
exports.default = newsRoutes;
//# sourceMappingURL=news.routes.js.map