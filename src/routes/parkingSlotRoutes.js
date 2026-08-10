import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import * as parkingSlotController from "../controllers/parkingSlotController.js";

const router = Router();

router.get("/", asyncHandler(parkingSlotController.getAllSlots));
router.get("/available", asyncHandler(parkingSlotController.getAvailableSlots));
router.get("/available-by-time", asyncHandler(parkingSlotController.getAvailableSlotsByTime));
router.get("/availableByVehicle", asyncHandler(parkingSlotController.getAvailableSlotsByVehicle));
router.get("/user/:userId", asyncHandler(parkingSlotController.getSlotsByUserId));
router.get("/parking/:parkingId", asyncHandler(parkingSlotController.getSlotsByParkingId));
router.post("/batch", asyncHandler(parkingSlotController.addParkingSlots));
router.post("/", asyncHandler(parkingSlotController.createSlot));
router.get("/:slotId", asyncHandler(parkingSlotController.getSlotById));
router.put("/:slotId", asyncHandler(parkingSlotController.updateSlot));
router.delete("/:slotId", asyncHandler(parkingSlotController.deleteSlot));

export default router;
