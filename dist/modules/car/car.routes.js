"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./../../middleware/auth.middleware");
const express_1 = require("express");
const car_controllers_1 = __importDefault(require("./car.controllers"));
const carRoutes = (0, express_1.Router)();
carRoutes.get("/get", car_controllers_1.default.getCar);
carRoutes.post("/post", car_controllers_1.default.postCar);
carRoutes.delete("/delete", car_controllers_1.default.deleteCar);
carRoutes.put("/put/:id", car_controllers_1.default.putCar);
carRoutes.patch("/patch", auth_middleware_1.authMiddleware, car_controllers_1.default.patchCar);
exports.default = carRoutes;
//# sourceMappingURL=car.routes.js.map