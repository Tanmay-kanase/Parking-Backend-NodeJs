import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import * as feedbackController from "../controllers/feedbackController.js";

const router = Router();

router.post("/", asyncHandler(feedbackController.addFeedback));
router.get("/user/:userId", asyncHandler(feedbackController.getFeedbackByUserId));

export default router;
