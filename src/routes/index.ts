import { Router } from "express";
import cors from "cors";
import authRoutes from "../modules/auth/auth.routes";
import carRoutes from "../modules/car/car.routes";
import tourRoutes from "../modules/tour/tour.routes";
import categoriesRoutes from "../modules/categoties/categoties.routes";
import favoriteRoutes from "../modules/favorite/favorite.routes";
import hotelRoutes from "../modules/hotel/hotel.routes";
import { adminMiddleware } from "../middleware/admin.middleware";

const globalRoutes = Router();

const corsConfig = {
  origin: ["http://localhost:3000"],
};
globalRoutes.use(cors(corsConfig));
globalRoutes.use("/auth", authRoutes);
globalRoutes.use("/car", carRoutes);
globalRoutes.use("/tour", tourRoutes);
globalRoutes.use("/categories", categoriesRoutes);
globalRoutes.use("/favorite", adminMiddleware, favoriteRoutes);
globalRoutes.use("/hotel", hotelRoutes);

export default globalRoutes;
