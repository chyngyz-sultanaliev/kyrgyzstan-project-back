import { Router } from "express";
import categories from "./categoties.controllers";
import { adminMiddleware } from "../../middleware/admin.middleware";

const categoriesRoutes = Router();

// Tours categories
categoriesRoutes.get("/tour", categories.getTourCategories);
categoriesRoutes.get("/tour/:id", categories.getTourCategory);
categoriesRoutes.post("/tour",adminMiddleware, categories.createTourCategory);
categoriesRoutes.put("/tour/:id",adminMiddleware, categories.updateTourCategory);
categoriesRoutes.delete("/tour/:id",adminMiddleware, categories.deleteTourCategory);

//   Cars categories
categoriesRoutes.get("/car", categories.getCarCategories);
categoriesRoutes.get("/car/:id", categories.getCarCategory);
categoriesRoutes.post("/car",adminMiddleware, categories.createCarCategory);
categoriesRoutes.put("/car/:id",adminMiddleware, categories.updateCarCategory);
categoriesRoutes.delete("/car/:id",adminMiddleware, categories.deleteCarCategory);

//  Hotels categories
categoriesRoutes.get("/hotel", categories.getHotelCategories);
categoriesRoutes.get("/hotel/:id", categories.getHotelCategory);
categoriesRoutes.post("/hotel",adminMiddleware, categories.createHotelCategory);
categoriesRoutes.put("/hotel/:id",adminMiddleware, categories.updateHotelCategory);
categoriesRoutes.delete("/hotel/:id",adminMiddleware, categories.deleteHotelCategory);

export default categoriesRoutes;
