import mongoose from "mongoose";

const ticketCollection = "ticket";

const ticketSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    purchase_datatime: { type: Date, default: Date.now() },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
