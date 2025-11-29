import { Router } from "express";
import tourControllers from "./tour.controllers";
import { adminMiddleware } from "../../middleware/admin.middleware";
import { authMiddleware } from "../../middleware/auth.middleware";

const tourRoutes = Router();
// Tour
tourRoutes.get("/get", tourControllers.getTour);
tourRoutes.post("/post", authMiddleware, adminMiddleware, tourControllers.postTour);
tourRoutes.put("/put/:id", authMiddleware, adminMiddleware, tourControllers.putTour);
tourRoutes.delete("/delete/:id", authMiddleware, adminMiddleware, tourControllers.deleteTour);

// TourDay
tourRoutes.get("/days", tourControllers.getTourDay);
tourRoutes.post("/days", authMiddleware, adminMiddleware, tourControllers.postTourDay);
tourRoutes.put("/days/:id", authMiddleware, adminMiddleware, tourControllers.putTourDay);
tourRoutes.delete("/days/:id", authMiddleware, adminMiddleware, tourControllers.deleteTourday);

export default tourRoutes;
