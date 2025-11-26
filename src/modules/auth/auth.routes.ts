import { Router } from "express";
import authControllers from "./auth.controllers";

const authRoutes = Router();

authRoutes.post("/post", authControllers.signup);

export default authRoutes;