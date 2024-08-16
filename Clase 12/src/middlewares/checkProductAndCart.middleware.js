import { request, response } from "express";
import cartServices from "../services/cart.services.js";
import productRepository from "../persistence/mongoDB/product.repository.js";


export const checkProductAndCart = async (req = request, res = response, next) => {
  const { cid, pid } = req.params;
    const product = await productRepository.getById(pid);
    if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
    const cart = await cartServices.getCartById(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

    next();
}