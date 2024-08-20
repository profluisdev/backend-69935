import { Router } from "express";
import productsControllers from "../controllers/products.controllers.js";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
const router = Router();

router.get("/", productsControllers.getAllProducts);

router.get("/:pid", productsControllers.getProductById);

router.delete("/:pid", authorization("admin"), productsControllers.deleteProduct);

router.put("/:pid", authorization("admin"), productsControllers.updateProduct);

router.post("/", authorization("admin"), checkProductData, productsControllers.createProduct);

export default router;
