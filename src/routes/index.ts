import { Router } from "express";
import cors from "cors";
import carRoutes from "../modules/car/car.routes";
import authRoutes from "../modules/auth/auth.routes";
import tourRoutes from "../modules/tour/tour.routes";
import hotelRoutes from "../modules/hotel/hotel.routes";
import categoriesRoutes from "../modules/categoties/categoties.routes";
import reviewRoutes from "../modules/review/review.routes";
import favoriteRoutes from "../modules/favorite/favorite.routes";
import { authMiddleware } from "../middleware/auth.middleware";

const globalRoutes = Router();

const corsConfig = {
  origin: ["http://localhost:3000"],
};
globalRoutes.use(cors(corsConfig));
globalRoutes.use("/car", carRoutes);
globalRoutes.use("/auth", authRoutes);
globalRoutes.use("/tour", tourRoutes);
globalRoutes.use("/hotel", hotelRoutes);
globalRoutes.use("/categories", categoriesRoutes);
globalRoutes.use("/review", authMiddleware, reviewRoutes);
globalRoutes.use("/favorite", authMiddleware, favoriteRoutes);

export default globalRoutes;
