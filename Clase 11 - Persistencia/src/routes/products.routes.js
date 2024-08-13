import { Router } from "express";
import productsControllers from "../controllers/products.controllers.js";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
const router = Router();

router.get("/", productsControllers.getAllProducts);

router.get("/:pid", productsControllers.getProductById);

router.delete("/:pid", productsControllers.deleteProduct);

router.put("/:pid", productsControllers.updateProduct);

router.post("/", checkProductData, productsControllers.createProduct);

export default router;
