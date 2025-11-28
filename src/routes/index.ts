import { Router } from "express";
import cors from "cors";
import authRoutes from "../modules/auth/auth.routes";
import carRoutes from "../modules/car/car.routes";
import categoryRoutes from "../modules/categoties/categoties.routes";

const globalRoutes = Router();

const corsConfig = {
  origin: ["http://localhost:3000"],
};
globalRoutes.use(cors(corsConfig));
globalRoutes.use("/auth", authRoutes);
globalRoutes.use("/car", carRoutes);
globalRoutes.use("/categories", categoryRoutes);

export default globalRoutes;
