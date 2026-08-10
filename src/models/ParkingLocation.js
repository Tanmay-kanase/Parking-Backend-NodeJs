import mongoose from "mongoose";
import { idField, applyIdTransform } from "./idField.js";

const geoPointSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], default: undefined }, // [lng, lat]
  },
  { _id: false }
);

const parkingLocationSchema = new mongoose.Schema(
  {
    _id: idField(),
    userId: String, // User who owns this parking location
    name: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    slotIds: { type: [String], default: [] },
    evCharging: { type: Boolean, default: false },
    cctvCamera: { type: Boolean, default: false },
    washing: { type: Boolean, default: false },
    location: geoPointSchema, // GeoJSON Point [lng, lat]
  },
  { collection: "parking_locations", _id: false }
);

parkingLocationSchema.index({ location: "2dsphere" });

applyIdTransform(parkingLocationSchema, "locationId");

export const ParkingLocation = mongoose.model("ParkingLocation", parkingLocationSchema);
