import { Router } from "express";
import tourController from "./tour.controllers"
import { authMiddleware } from "../../middleware/auth.middleware";
import { adminMiddleware } from "../../middleware/admin.middleware";


const tourRoutes: Router = Router();

tourRoutes.get("/tourGet", tourController.getTour);

tourRoutes.post("/tourPost", authMiddleware, adminMiddleware, tourController.postTour);
tourRoutes.put("/tourPut/:id", authMiddleware, adminMiddleware, tourController.putTour);
tourRoutes.patch("/tourPatch/:id", authMiddleware, adminMiddleware, tourController.patchTour);
tourRoutes.delete("/tourDelete/:id", authMiddleware, adminMiddleware, tourController.deleteTour);


export default tourRoutes