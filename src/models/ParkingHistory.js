import mongoose from "mongoose";
import { idField, applyIdTransform } from "./idField.js";

const parkingHistorySchema = new mongoose.Schema(
  {
    _id: idField(),
    userId: String,
    vehicleId: String,
    parking_lot_id: String,
    slotId: String,
    paymentId: String,
    entryTime: String,
    exitTime: String,
    amountPaid: String,
  },
  { collection: "parking_history", _id: false }
);

// NOTE: kept as "histroy_id" (typo) to match the existing frontend field name
applyIdTransform(parkingHistorySchema, "histroy_id");

export const ParkingHistory = mongoose.model("ParkingHistory", parkingHistorySchema);
