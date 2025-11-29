import { Router } from "express";
import tourControllers from "./tour.controllers";
import { adminMiddleware } from "../../middleware/admin.middleware";

const routes = Router();
// Tour
routes.get("/get", tourControllers.getTour);
routes.post("/post", adminMiddleware, tourControllers.postTour);
routes.put("/put/:id", adminMiddleware, tourControllers.putTour);
routes.delete("/delete/:id", adminMiddleware, tourControllers.deleteTour);

// TourDay
routes.get("/days", tourControllers.getTourDay);
routes.post("/days", adminMiddleware, tourControllers.postTourDay);
routes.put("/days/:id", adminMiddleware, tourControllers.putTourDay);
routes.delete("/days/:id", adminMiddleware, tourControllers.deleteTourday);

export default routes;
