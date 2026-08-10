import mongoose from "mongoose";
import { idField, applyIdTransform } from "./idField.js";

const parkingSlotSchema = new mongoose.Schema(
  {
    _id: idField(),
    userId: String,
    parkingId: String,
    slotNumber: String,
    location: String,
    pricePerHour: { type: Number, default: 0 },
    vehicleType: String,
    isAvailable: { type: Boolean, default: true },
  },
  { collection: "parking_slots", _id: false }
);

applyIdTransform(parkingSlotSchema, "slotId");

export const ParkingSlot = mongoose.model("ParkingSlot", parkingSlotSchema);
