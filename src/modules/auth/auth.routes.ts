import { Router } from "express";
import authController from "./auth.controllers";
import { authMiddleware } from "../../middleware/auth.middleware";

const authRoutes = Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.get("/profile", authMiddleware, authController.profile);
authRoutes.put("/update", authMiddleware, authController.update);

export default authRoutes;
