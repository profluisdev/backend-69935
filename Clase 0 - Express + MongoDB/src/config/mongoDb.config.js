
import mongoose from "mongoose";

export const connectDb = async () => {
  try {

    await mongoose.connect("mongodb://localhost:27017/clase-0");
    console.log("Connected to MongoDB");
    
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}