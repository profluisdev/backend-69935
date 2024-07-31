import mongoose from "mongoose";
import envsConfig from "./envs.config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(envsConfig.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error connecting to MongoDB");
  }
};
