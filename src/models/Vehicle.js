import mongoose from "mongoose";
import { idField, applyIdTransform } from "./idField.js";

const vehicleSchema = new mongoose.Schema(
  {
    _id: idField(),
    userId: String,
    licensePlate: String,
    vehicleType: String, // "Car", "Bike", etc.
    comapany: String, // NOTE: kept as-is (typo) to match the existing frontend field name
  },
  { collection: "vehicles", _id: false }
);

applyIdTransform(vehicleSchema, "vehicleId");

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
