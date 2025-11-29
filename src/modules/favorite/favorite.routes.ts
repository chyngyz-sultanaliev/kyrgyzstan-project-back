import { Router } from "express";
import favoriteControllers from "./favorite.controllers";

const favoriteRoutes = Router();

favoriteRoutes.get("/", favoriteControllers.getAll);
favoriteRoutes.post("/", favoriteControllers.addFavorite);
favoriteRoutes.delete("/:id", favoriteControllers.removeFavorite);

export default favoriteRoutes;
