"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_middleware_1 = require("./../../middleware/admin.middleware");
const express_1 = require("express");
const car_controllers_1 = __importDefault(require("./car.controllers"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const carRoutes = (0, express_1.Router)();
carRoutes.get("/get", car_controllers_1.default.getCar);
carRoutes.post("/post", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, car_controllers_1.default.postCar);
carRoutes.delete("/delete", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, car_controllers_1.default.deleteCar);
carRoutes.put("/put/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, car_controllers_1.default.putCar);
exports.default = carRoutes;
//# sourceMappingURL=car.routes.js.map