import { Router } from "express";
import categories from "./categoties.controllers";

const categoriesRoutes = Router();

// Tours categories
categoriesRoutes.get("/tour", categories.getTourCategories);
categoriesRoutes.get("/tour/:id", categories.getTourCategory);
categoriesRoutes.post("/tour", categories.createTourCategory);
categoriesRoutes.put("/tour/:id", categories.updateTourCategory);
categoriesRoutes.delete("/tour/:id", categories.deleteTourCategory);

//   Cars categories
categoriesRoutes.get("/car", categories.getCarCategories);
categoriesRoutes.get("/car/:id", categories.getCarCategory);
categoriesRoutes.post("/car", categories.createCarCategory);
categoriesRoutes.put("/car/:id", categories.updateCarCategory);
categoriesRoutes.delete("/car/:id", categories.deleteCarCategory);

//  Hotels categories
categoriesRoutes.get("/hotel", categories.getHotelCategories);
categoriesRoutes.get("/hotel/:id", categories.getHotelCategory);
categoriesRoutes.post("/hotel", categories.createHotelCategory);
categoriesRoutes.put("/hotel/:id", categories.updateHotelCategory);
categoriesRoutes.delete("/hotel/:id", categories.deleteHotelCategory);

export default categoriesRoutes;
