import { Router } from "express";
import newsControllers from "./news.controllers";
import { adminMiddleware } from "../../middleware/admin.middleware";
import { authMiddleware } from "../../middleware/auth.middleware";

const newsRoutes = Router();

newsRoutes.get("/", newsControllers.getNews);
newsRoutes.post("/", authMiddleware, adminMiddleware, newsControllers.postNews);
newsRoutes.delete("/:id", authMiddleware, adminMiddleware, newsControllers.delNews);

export default newsRoutes;
