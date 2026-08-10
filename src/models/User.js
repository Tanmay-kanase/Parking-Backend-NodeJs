import mongoose from "mongoose";
import { idField, applyIdTransform } from "./idField.js";

const userSchema = new mongoose.Schema(
  {
    _id: idField(),
    name: String,
    email: { type: String, index: true },
    password: String,
    phone: String,
    photo: String,
    role: String, // "user", "parking_host", "admin"
    vehicles: [String], // List of vehicle IDs
  },
  { collection: "users", _id: false }
);

applyIdTransform(userSchema, "userId");

export const User = mongoose.model("User", userSchema);
