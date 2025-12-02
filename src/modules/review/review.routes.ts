import { Router } from "express";
import reviewController from "./review.controllers";

const reviewRoutes = Router();

reviewRoutes.post("/car", reviewController.postCarReview);
reviewRoutes.post("/tour", reviewController.postTourReview);
reviewRoutes.post("/hotel", reviewController.postHotelReview);
reviewRoutes.put("/:id", reviewController.putReview);
reviewRoutes.delete("/:id", reviewController.deleteReview);

export default reviewRoutes;
