import mongoose from "mongoose";
import { idField, applyIdTransform } from "./idField.js";

const paymentSchema = new mongoose.Schema(
  {
    _id: idField(),
    userId: String,
    email: String,
    contact: String,
    description: String,
    bank: String,
    wallet: String,
    vpa: String,
    entity: String,
    currency: String,
    amount: { type: Number, default: 0 },
    fee: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    transactionId: { type: String, unique: true, sparse: true },
    paymentMethod: String, // "credit_card", "paypal", "upi", ...
    status: String, // "completed", "failed"
    paymentTime: Date,
  },
  { collection: "payments", _id: false }
);

applyIdTransform(paymentSchema, "paymentId");

export const Payment = mongoose.model("Payment", paymentSchema);
