import mongoose from "mongoose";
import { idField, applyIdTransform } from "./idField.js";

const feedbackSchema = new mongoose.Schema(
  {
    _id: idField(),
    userId: String,
    slotId: String,
    rating: { type: Number, default: 0 }, // 1-5
    comment: String,
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "feedbacks", _id: false }
);

applyIdTransform(feedbackSchema, "feedbackId");

export const Feedback = mongoose.model("Feedback", feedbackSchema);
