"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_controllers_1 = __importDefault(require("./news.controllers"));
const newsRoutes = (0, express_1.Router)();
newsRoutes.get("/", news_controllers_1.default.getNews);
newsRoutes.post("/", news_controllers_1.default.postNews);
newsRoutes.delete("/:id", news_controllers_1.default.delNews);
exports.default = newsRoutes;
//# sourceMappingURL=news.routes.js.map