import { Router } from "express";
import authControllers from "./auth.controllers";

const authRoutes = Router();

authRoutes.get("/post", authControllers.signup);

export default authRoutes;
