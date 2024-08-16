import { respProductDto } from "../dto/product.dto.js";
import productRepository from "../persistence/mongoDB/product.repository.js";

const getAllProducts = async (query, options) => {
    return await productRepository.getAll(query, options);
};

const getProductById = async (pid) => {
    const product = await productRepository.getById(pid);
    const productResponse = respProductDto(product); 
    return productResponse;
};
     

const updateProduct = async (pid, productData) => {
    return await productRepository.update(pid, productData);
};

const createProduct = async (productData) => {
    return await productRepository.create(productData);
};

const deleteProduct = async (pid) => {
    return await productRepository.deleteOne(pid);
};

export default {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};
