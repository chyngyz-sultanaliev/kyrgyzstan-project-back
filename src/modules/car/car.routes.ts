import { adminMiddleware } from "./../../middleware/admin.middleware";
import { Router } from "express";
import carControllers from "./car.controllers";

const carRoutes = Router();
carRoutes.get("/get", carControllers.getCar);
carRoutes.post("/post", adminMiddleware, carControllers.postCar);
carRoutes.delete("/delete", adminMiddleware, carControllers.deleteCar);
carRoutes.put("/put/:id", adminMiddleware, carControllers.putCar);

export default carRoutes;
