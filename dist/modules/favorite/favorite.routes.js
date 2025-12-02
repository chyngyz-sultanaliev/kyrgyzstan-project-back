"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favorite_controllers_1 = __importDefault(require("./favorite.controllers"));
const favoriteRoutes = (0, express_1.Router)();
favoriteRoutes.get("/", favorite_controllers_1.default.getAll);
favoriteRoutes.post("/", favorite_controllers_1.default.addFavorite);
favoriteRoutes.delete("/:id", favorite_controllers_1.default.removeFavorite);
exports.default = favoriteRoutes;
//# sourceMappingURL=favorite.routes.js.map