import { Router } from "express";
import cors from "cors";
import authRoutes from "../modules/auth/auth.routes";
import carRoutes from "../modules/car/car.routes";

const globalRoutes = Router();

const corsConfig = {
  origin: ["http://localhost:3000"],
};
globalRoutes.use(cors(corsConfig));
globalRoutes.use("/auth", authRoutes);
globalRoutes.use("/car", carRoutes);

export default globalRoutes;
