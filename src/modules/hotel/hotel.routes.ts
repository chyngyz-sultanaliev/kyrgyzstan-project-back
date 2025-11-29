import { authMiddleware } from './../../middleware/auth.middleware';
import { Router } from "express";
import controllers from "./hotel.controllers";
import { adminMiddleware } from "../../middleware/admin.middleware";

const hotelRoutes = Router();

hotelRoutes.get("/get", controllers.getHotel);
hotelRoutes.post("/post", authMiddleware, adminMiddleware, controllers.postHotel);
hotelRoutes.patch("/patch/:id", authMiddleware, adminMiddleware, controllers.updateHotel);
hotelRoutes.delete("/delete/:id", authMiddleware, adminMiddleware, controllers.deleteHotel);

export default hotelRoutes;
