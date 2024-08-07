import { request, response } from "express";
import productDao from "../dao/mongoDB/product.dao.js";
import cartServices from "../services/cart.services.js";

export const checkProductAndCart = async (req = request, res = response, next) => {
  const { cid, pid } = req.params;
    const product = await productDao.getById(pid);
    if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
    const cart = await cartServices.getById(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
}