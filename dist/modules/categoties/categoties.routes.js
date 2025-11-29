"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoties_controllers_1 = __importDefault(require("./categoties.controllers"));
const categoriesRoutes = (0, express_1.Router)();
// Tours categories
categoriesRoutes.get("/tour", categoties_controllers_1.default.getTourCategories);
categoriesRoutes.get("/tour/:id", categoties_controllers_1.default.getTourCategory);
categoriesRoutes.post("/tour", categoties_controllers_1.default.createTourCategory);
categoriesRoutes.put("/tour/:id", categoties_controllers_1.default.updateTourCategory);
categoriesRoutes.delete("/tour/:id", categoties_controllers_1.default.deleteTourCategory);
//   Cars categories
categoriesRoutes.get("/car", categoties_controllers_1.default.getCarCategories);
categoriesRoutes.get("/car/:id", categoties_controllers_1.default.getCarCategory);
categoriesRoutes.post("/car", categoties_controllers_1.default.createCarCategory);
categoriesRoutes.put("/car/:id", categoties_controllers_1.default.updateCarCategory);
categoriesRoutes.delete("/car/:id", categoties_controllers_1.default.deleteCarCategory);
//  Hotels categories
categoriesRoutes.get("/hotel", categoties_controllers_1.default.getHotelCategories);
categoriesRoutes.get("/hotel/:id", categoties_controllers_1.default.getHotelCategory);
categoriesRoutes.post("/hotel", categoties_controllers_1.default.createHotelCategory);
categoriesRoutes.put("/hotel/:id", categoties_controllers_1.default.updateHotelCategory);
categoriesRoutes.delete("/hotel/:id", categoties_controllers_1.default.deleteHotelCategory);
exports.default = categoriesRoutes;
//# sourceMappingURL=categoties.routes.js.map