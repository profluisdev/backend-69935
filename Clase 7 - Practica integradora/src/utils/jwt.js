import jwt from "jsonwebtoken";
import envsConfig from "../config/envs.config.js";

export const createToken = (user) => {
  const { _id, email } = user;
  const token = jwt.sign({_id, email }, envsConfig.JWT_CODE, { expiresIn: "5m" });
  return token;
};

export const verifyToken = (token) => {
  try {
    const decode = jwt.verify(token, envsConfig.JWT_CODE);
    return decode;
  } catch (error) {
    return null;
  }
};
