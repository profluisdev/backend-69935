import mongoose from "mongoose";

const movementCollection = "movements";

const movementSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  description: { type: String },
  amount: { type: Number, required: true },
  operationType: { type: String, required: true },
  originAccountId: { type: String, required: true },
  destinationAccountId: { type: String },
  userId: { type: String, required: true },
});

movementSchema.pre("findOne", function () {
  this.populate("account");
});

export const movementModel = mongoose.model(movementCollection, movementSchema);
