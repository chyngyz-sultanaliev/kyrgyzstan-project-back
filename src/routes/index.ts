import { Router } from "express";
import cors from "cors";
import authRoutes from "../modules/auth/auth.routes";

const globalRoutes = Router();

const corsConfig = {
  origin: ["http://localhost:3000"],
};
globalRoutes.use(cors(corsConfig));
globalRoutes.use("/auth", authRoutes);

export default globalRoutes;
