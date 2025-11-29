import { Router } from "express";
import tourControllers from "./tour.controllers";

const routes = Router()
// Tour
routes.get("/get", tourControllers.getTour)
routes.post("/post", tourControllers.postTour)
routes.put("/put/:id", tourControllers.putTour)
routes.delete("/delete/:id", tourControllers.deleteTour)

// TourDay
routes.get("/days", tourControllers.getTourDay)
routes.post("/days", tourControllers.postTourDay)
routes.put("/days/:id", tourControllers.putTourDay)
routes.delete("/days/:id", tourControllers.deleteTourday)

export default routes