"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoties_controllers_1 = __importDefault(require("./categoties.controllers"));
const admin_middleware_1 = require("../../middleware/admin.middleware");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const categoriesRoutes = (0, express_1.Router)();
// Tours categories
categoriesRoutes.get("/tour", categoties_controllers_1.default.getTourCategories);
categoriesRoutes.get("/tour/:id", categoties_controllers_1.default.getTourCategory);
categoriesRoutes.post("/tour", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, categoties_controllers_1.default.createTourCategory);
categoriesRoutes.put("/tour/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, categoties_controllers_1.default.updateTourCategory);
categoriesRoutes.delete("/tour/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, categoties_controllers_1.default.deleteTourCategory);
//   Cars categories
categoriesRoutes.get("/car", categoties_controllers_1.default.getCarCategories);
categoriesRoutes.get("/car/:id", categoties_controllers_1.default.getCarCategory);
categoriesRoutes.post("/car", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, categoties_controllers_1.default.createCarCategory);
categoriesRoutes.put("/car/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, categoties_controllers_1.default.updateCarCategory);
categoriesRoutes.delete("/car/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, categoties_controllers_1.default.deleteCarCategory);
//  Hotels categories
categoriesRoutes.get("/hotel", categoties_controllers_1.default.getHotelCategories);
categoriesRoutes.get("/hotel/:id", categoties_controllers_1.default.getHotelCategory);
categoriesRoutes.post("/hotel", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, categoties_controllers_1.default.createHotelCategory);
categoriesRoutes.put("/hotel/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, categoties_controllers_1.default.updateHotelCategory);
categoriesRoutes.delete("/hotel/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, categoties_controllers_1.default.deleteHotelCategory);
exports.default = categoriesRoutes;
//# sourceMappingURL=categoties.routes.js.map