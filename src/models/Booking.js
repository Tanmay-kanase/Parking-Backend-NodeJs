import mongoose from "mongoose";
import { idField, applyIdTransform } from "./idField.js";

const bookingSchema = new mongoose.Schema(
  {
    _id: idField(),
    userId: String,
    slotId: String,
    locationId: String,
    email: String,
    slotNumber: String,
    transactionId: String,
    location: String,
    amountPaid: { type: Number, default: 0 },
    paymentStatus: String,
    startTime: Date,
    endTime: Date, // Time when parking ends
    paymentMethod: String,
    licensePlate: String,
    vehicleType: String, // "Car", "Bike", etc.
    status: { type: String, default: "ACTIVE" },
  },
  { collection: "bookings", _id: false }
);

applyIdTransform(bookingSchema, "bookingId");

export const Booking = mongoose.model("Booking", bookingSchema);
