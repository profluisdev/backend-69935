import mongoose from "mongoose";

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  products: {
    type: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: "product" }, quantity: Number }],
    default: [],
  },
});

cartSchema.pre("find", function (){
  this.populate("products.product")
})

export const cartModel = mongoose.model(cartCollection, cartSchema);
