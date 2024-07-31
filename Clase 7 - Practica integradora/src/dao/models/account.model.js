import mongoose from "mongoose";

const accountCollection = "accounts";

const accountSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  alias: { type: String, required: true },
  balance: { type: Number, default: 0},
  userId: { type: String, required: true },
});

export const accountModel = mongoose.model(accountCollection, accountSchema);
