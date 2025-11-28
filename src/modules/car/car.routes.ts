import { authMiddleware } from "./../../middleware/auth.middleware";
import { Router } from "express";
import carControllers from "./car.controllers";

const carRoutes = Router();
carRoutes.get("/get", carControllers.getCar);
carRoutes.post("/post", carControllers.postCar);
carRoutes.delete("/delete", carControllers.deleteCar);
carRoutes.put("/put/:id", carControllers.putCar);
carRoutes.patch("/patch", authMiddleware, carControllers.patchCar);

export default carRoutes;
