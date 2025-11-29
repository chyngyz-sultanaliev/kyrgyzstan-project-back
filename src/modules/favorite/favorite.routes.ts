import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import favoriteControllers from "./favorite.controllers";

const favoriteRoutes = Router();

favoriteRoutes.get("/", authMiddleware, favoriteControllers.getAll);

favoriteRoutes.post("/", authMiddleware, favoriteControllers.addFavorite);

favoriteRoutes.delete("/:id", authMiddleware, favoriteControllers.removeFavorite);

export default favoriteRoutes