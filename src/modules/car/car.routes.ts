import { authMiddleware } from "./../../middleware/auth.middleware";
import { Router } from "express";
import carControllers from "./car.controllers";
import { validate } from "../../middleware/validation.middleware";
import { carSchema } from "../../modules/car/car.schema";

const carRoutes = Router();

carRoutes.get("/get", carControllers.getCar);
carRoutes.post("/post", validate(carSchema), carControllers.postCar);
carRoutes.delete("/delete", carControllers.deleteCar);
carRoutes.put("/put/:id", validate(carSchema), carControllers.putCar);
carRoutes.patch(
  "/patch",
  validate(carSchema.partial()),
  authMiddleware,
  carControllers.patchCar
);

export default carRoutes;
