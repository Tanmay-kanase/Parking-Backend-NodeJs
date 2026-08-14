import express from "express";
import { verifyBookingController } from "../controllers/verifyController.js";

const router = express.Router();

router.post("/:bookingId", verifyBookingController);

export default router;
