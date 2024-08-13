import { Router } from "express";
import cartsControllers from "../controllers/carts.controllers.js";
import { checkProductAndCart } from "../middlewares/checkProductAndCart.middleware.js";

const router = Router();

router.post("/", cartsControllers.createCart);

router.get("/:cid", cartsControllers.getCartById);

router.post("/:cid/product/:pid", checkProductAndCart, cartsControllers.addProductToCart);

router.delete("/:cid/product/:pid", checkProductAndCart, cartsControllers.deleteProductToCart);

router.put("/:cid/product/:pid", checkProductAndCart, cartsControllers.updateQuantityProductInCart);

router.delete("/:cid", cartsControllers.deleteProductToCart);

export default router;
