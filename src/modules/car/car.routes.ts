import { adminMiddleware } from "./../../middleware/admin.middleware";
import { Router } from "express";
import carControllers from "./car.controllers";
import { authMiddleware } from "../../middleware/auth.middleware";

const carRoutes = Router();

carRoutes.get("/get", carControllers.getCar);
carRoutes.get("/get/:id", carControllers.getOneCar);
carRoutes.post("/post", authMiddleware, adminMiddleware, carControllers.postCar);
carRoutes.delete("/delete", authMiddleware, adminMiddleware, carControllers.deleteCar);
carRoutes.put("/put/:id", authMiddleware, adminMiddleware, carControllers.putCar);

export default carRoutes;
