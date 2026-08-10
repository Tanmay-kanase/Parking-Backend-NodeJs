import * as feedbackService from "../services/feedbackService.js";

export async function addFeedback(req, res) {
  res.json(await feedbackService.addFeedback(req.body));
}

export async function getFeedbackByUserId(req, res) {
  res.json(await feedbackService.getFeedbackByUserId(req.params.userId));
}
