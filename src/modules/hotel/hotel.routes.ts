import { Router } from "express";
import controllers from "./hotel.controllers";

const router = Router();

router.get("/get", controllers.getHotel);
router.post("/post", controllers.postHotel);
router.patch("/patch/:id", controllers.updateHotel);
router.delete("/delete/:id", controllers.deleteHotel);

export default router;
