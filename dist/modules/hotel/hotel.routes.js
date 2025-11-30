"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./../../middleware/auth.middleware");
const express_1 = require("express");
const hotel_controllers_1 = __importDefault(require("./hotel.controllers"));
const admin_middleware_1 = require("../../middleware/admin.middleware");
const hotelRoutes = (0, express_1.Router)();
hotelRoutes.get("/get", hotel_controllers_1.default.getHotel);
hotelRoutes.post("/post", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, hotel_controllers_1.default.postHotel);
hotelRoutes.patch("/patch/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, hotel_controllers_1.default.updateHotel);
hotelRoutes.delete("/delete/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, hotel_controllers_1.default.deleteHotel);
exports.default = hotelRoutes;
//# sourceMappingURL=hotel.routes.js.map