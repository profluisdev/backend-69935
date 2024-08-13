import cartRepository from "../persistence/mongoDB/cart.repository.js";

const createCart = async () => {
    return await cartRepository.create();
};

const getCartById = async (id) => {
    return await cartRepository.getById(cid);
};

const addProductToCart = async (cid, pid) => {
    return await cartRepository.addProductToCart(cid, pid);
};

const deleteProductToCart = async (cid, pid) => {
    return await cartRepository.deleteProductToCart(cid, pid);
};
const updateQuantityProductInCart = async (cid, pid, quantity) => {
    return await cartRepository.updateQuantityProductInCart(cid, pid, quantity);
};

const clearProductsToCart = async (cid) => {
    return await cartRepository.clearProductsToCart(cid);
};

export default {
    createCart,
    getCartById,
    addProductToCart,
    deleteProductToCart,
    updateQuantityProductInCart,
    clearProductsToCart,
};
