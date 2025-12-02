"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tour_controllers_1 = __importDefault(require("./tour.controllers"));
const admin_middleware_1 = require("../../middleware/admin.middleware");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const tourRoutes = (0, express_1.Router)();
// Tour
tourRoutes.get("/get", tour_controllers_1.default.getTour);
tourRoutes.post("/post", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, tour_controllers_1.default.postTour);
tourRoutes.put("/put/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, tour_controllers_1.default.putTour);
tourRoutes.delete("/delete/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, tour_controllers_1.default.deleteTour);
// TourDay
tourRoutes.get("/days", tour_controllers_1.default.getTourDay);
tourRoutes.post("/days", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, tour_controllers_1.default.postTourDay);
tourRoutes.put("/days/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, tour_controllers_1.default.putTourDay);
tourRoutes.delete("/days/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, tour_controllers_1.default.deleteTourday);
exports.default = tourRoutes;
//# sourceMappingURL=tour.routes.js.map