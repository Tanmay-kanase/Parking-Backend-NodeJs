import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import * as paymentController from "../controllers/paymentController.js";

const router = Router();

router.get("/user/:userId", asyncHandler(paymentController.getPaymentsByUserId));
router.get("/status/:status", asyncHandler(paymentController.getPaymentsByStatus));
router.post("/", asyncHandler(paymentController.createPayment));
router.post("/create-order", asyncHandler(paymentController.createOrder));

export default router;
