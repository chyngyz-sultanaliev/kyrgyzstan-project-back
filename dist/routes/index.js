"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const car_routes_1 = __importDefault(require("../modules/car/car.routes"));
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const tour_routes_1 = __importDefault(require("../modules/tour/tour.routes"));
const news_routes_1 = __importDefault(require("../modules/news/news.routes"));
const hotel_routes_1 = __importDefault(require("../modules/hotel/hotel.routes"));
const categoties_routes_1 = __importDefault(require("../modules/categoties/categoties.routes"));
const review_routes_1 = __importDefault(require("../modules/review/review.routes"));
const favorite_routes_1 = __importDefault(require("../modules/favorite/favorite.routes"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const globalRoutes = (0, express_1.Router)();
const corsConfig = {
    origin: ["http://localhost:3000"],
};
globalRoutes.use((0, cors_1.default)(corsConfig));
globalRoutes.use("/car", car_routes_1.default);
globalRoutes.use("/auth", auth_routes_1.default);
globalRoutes.use("/tour", tour_routes_1.default);
globalRoutes.use("/news", news_routes_1.default);
globalRoutes.use("/hotel", hotel_routes_1.default);
globalRoutes.use("/categories", categoties_routes_1.default);
globalRoutes.use("/review", auth_middleware_1.authMiddleware, review_routes_1.default);
globalRoutes.use("/favorite", auth_middleware_1.authMiddleware, favorite_routes_1.default);
exports.default = globalRoutes;
//# sourceMappingURL=index.js.map