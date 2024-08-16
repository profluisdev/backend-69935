import { request, response } from "express";

export const isUserCart = async (req = request, res = response, next) => {
    const { cid } = req.params;

    if (req.user.cart._id !== cid) return res.status(401).json({ status: "error", msg: "Wrong cart user" });

    next();
};
