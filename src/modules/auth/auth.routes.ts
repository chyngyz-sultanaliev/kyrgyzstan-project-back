import { Router } from "express";
import authController from "./auth.controllers";
import { authMiddleware } from "../../middleware/auth.middleware";

const authRoutes = Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.get("/profile", authMiddleware, authController.profile);
authRoutes.put("/update", authMiddleware, authController.update);
// Сброс пароля
authRoutes.post("/request-reset", authController.requestResetPassword);
authRoutes.post("/verify-code", authController.verifyResetCode);
authRoutes.post("/reset-password", authController.resetPassword);

export default authRoutes;
