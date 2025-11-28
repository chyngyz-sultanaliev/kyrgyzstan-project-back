import { Router } from "express";
import categoryControllers from "./categories.controllers";
const categoryRoutes = Router();

categoryRoutes.get("/get", categoryControllers.getCategories);
categoryRoutes.post("/post", categoryControllers.postCategory);
categoryRoutes.put("/put/:id", categoryControllers.putCategory);
categoryRoutes.delete("/delete/:id", categoryControllers.deleteCategory);

export default categoryRoutes;
