import { Router } from "express";
import categories from "./categoties.controllers";
import { adminMiddleware } from "../../middleware/admin.middleware";
import { authMiddleware } from "../../middleware/auth.middleware";

const categoriesRoutes = Router();

// Tours categories
categoriesRoutes.get("/tour", categories.getTourCategories);
categoriesRoutes.get("/tour/:id", categories.getTourCategory);
categoriesRoutes.post("/tour", authMiddleware, adminMiddleware, categories.createTourCategory);
categoriesRoutes.put("/tour/:id", authMiddleware, adminMiddleware, categories.updateTourCategory);
categoriesRoutes.delete("/tour/:id", authMiddleware, adminMiddleware, categories.deleteTourCategory);

//   Cars categories
categoriesRoutes.get("/car", categories.getCarCategories);
categoriesRoutes.get("/car/:id", categories.getCarCategory);
categoriesRoutes.post("/car", authMiddleware, adminMiddleware, categories.createCarCategory);
categoriesRoutes.put("/car/:id", authMiddleware, adminMiddleware, categories.updateCarCategory);
categoriesRoutes.delete("/car/:id", authMiddleware, adminMiddleware, categories.deleteCarCategory);

//  Hotels categories
categoriesRoutes.get("/hotel", categories.getHotelCategories);
categoriesRoutes.get("/hotel/:id", categories.getHotelCategory);
categoriesRoutes.post("/hotel", authMiddleware, adminMiddleware, categories.createHotelCategory);
categoriesRoutes.put("/hotel/:id", authMiddleware, adminMiddleware, categories.updateHotelCategory);
categoriesRoutes.delete("/hotel/:id", authMiddleware, adminMiddleware, categories.deleteHotelCategory);

export default categoriesRoutes;
