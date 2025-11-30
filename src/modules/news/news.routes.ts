import { Router } from "express";
import newsControllers from "./news.controllers";

const newsRoutes = Router();

newsRoutes.get("/", newsControllers.getNews);
newsRoutes.post("/", newsControllers.postNews);
newsRoutes.delete("/:id", newsControllers.delNews);

export default newsRoutes;
