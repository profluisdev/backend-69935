import { request, response } from "express";
import productServices from "../services/product.services.js";

const getAllProducts = async (req = request, res = response) => {
    try {
        const { limit, page, sort, category, status } = req.query;

        const options = {
            limit: limit || 10,
            page: page || 1,
            sort: {
                price: sort === "asc" ? 1 : -1,
            },
            learn: true,
        };

        // Si nos solicitan por categoría
        if (category) {
            const products = await productServices.getAllProducts({ category }, options);
            return res.status(200).json({ status: "success", products });
        }

        if (status) {
            const products = await productServices.getAllProducts({ status }, options);
            return res.status(200).json({ status: "success", products });
        }

        const products = await productServices.getAllProducts({}, options);
        res.status(200).json({ status: "success", products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
};

const getProductById = async (req = request, res = response) => {
    try {
        const { pid } = req.params;
        const product = await productServices.getProductById(pid);
        if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

        res.status(200).json({ status: "success", product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
};

const updateProduct = async (req = request, res = response) => {
    try {
        const { pid } = req.params;
        const productData = req.body;
        const product = await productServices.updateProduct(pid, productData);
        if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

        res.status(200).json({ status: "success", product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
};

const createProduct = async (req = request, res = response) => {
    try {
        const productData = req.body;
        const product = await productServices.createProduct(productData);

        res.status(201).json({ status: "success", product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productServices.deleteProduct(pid);
        if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

        res.status(200).json({ status: "success", msg: `El producto con el id ${pid} fue eliminado` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
};

export default {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};
