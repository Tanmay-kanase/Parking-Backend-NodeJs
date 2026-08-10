import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import * as bookingController from "../controllers/bookingController.js";

const router = Router();

router.post("/", asyncHandler(bookingController.createBooking));
router.put("/", asyncHandler(bookingController.updateBooking));
router.post("/complete", asyncHandler(bookingController.completeBooking));
router.get("/user/:userId", asyncHandler(bookingController.getBookingsByUserId));
router.get("/location/:locationId", asyncHandler(bookingController.getBookingsByLocationId));
router.get("/:bookingId", asyncHandler(bookingController.getBookingById));
router.delete("/:bookingId", asyncHandler(bookingController.deleteBooking));

export default router;
