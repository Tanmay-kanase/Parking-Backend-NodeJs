import { Feedback } from "../models/Feedback.js";

export async function addFeedback(feedback) {
  return new Feedback(feedback).save();
}

export async function getFeedbackByUserId(userId) {
  return Feedback.find({ userId });
}
