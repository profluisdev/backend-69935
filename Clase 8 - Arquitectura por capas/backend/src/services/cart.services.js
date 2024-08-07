import cartDao from "../dao/mongoDB/cart.dao.js";

const createCart = async () => {
  return await cartDao.create();
};

const getCartById = async (id) => {
  return await cartDao.getById(cid);
};

const addProductToCart = async (cid, pid) => {
  return await cartDao.addProductToCart(cid, pid);
};

const deleteProductToCart = async (cid, pid) => {
  return await cartDao.deleteProductToCart(cid, pid);
};
const updateQuantityProductInCart = async (cid, pid, quantity) => {
  return await cartDao.updateQuantityProductInCart(cid, pid, quantity);
};

const clearProductsToCart = async (cid) => {
  return await cartDao.clearProductsToCart(cid);
};

export default {
  createCart,
  getCartById,
  addProductToCart,
  deleteProductToCart,
  updateQuantityProductInCart,
  clearProductsToCart,
};
