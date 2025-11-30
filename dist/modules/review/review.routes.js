"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controllers_1 = __importDefault(require("./review.controllers"));
const reviewRoutes = (0, express_1.Router)();
reviewRoutes.post("/car", review_controllers_1.default.postCarReview);
reviewRoutes.post("/tour", review_controllers_1.default.postTourReview);
reviewRoutes.post("/hotel", review_controllers_1.default.postHotelReview);
reviewRoutes.put("/:id", review_controllers_1.default.putReview);
reviewRoutes.delete("/:id", review_controllers_1.default.deleteReview);
exports.default = reviewRoutes;
//# sourceMappingURL=review.routes.js.map