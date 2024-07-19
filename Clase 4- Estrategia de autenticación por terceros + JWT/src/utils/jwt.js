import jwt from "jsonwebtoken";
import envs from "../config/envs.config.js"

export const createToken = (user) => {
  const { _id, email } = user;
  const token = jwt.sign({_id, email}, envs.JWT_SECRET_CODE, {expiresIn: "2m"});
  
  return token;
}

export const verifyToken = (token) => {
  try {

    const decoded = jwt.verify(token, envs.JWT_SECRET_CODE);
    return decoded;
    
  } catch (error) {
    return null;
  }
}