import mongoose from "mongoose";

const userCollection = "user";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  role: {
    type: String,
    default: "user",
  },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "cart" },
});

userSchema.pre("findOne", function () {
  this.populate("cart");
});

export const userModel = mongoose.model(userCollection, userSchema);
