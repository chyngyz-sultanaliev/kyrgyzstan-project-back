import { Router } from "express";
import controllers from "./hotel.controllers";
import { adminMiddleware } from "../../middleware/admin.middleware";

const router = Router();

router.get("/get", controllers.getHotel);
router.post("/post", adminMiddleware, controllers.postHotel);
router.patch("/patch/:id", adminMiddleware, controllers.updateHotel);
router.delete("/delete/:id", adminMiddleware, controllers.deleteHotel);

export default router;
