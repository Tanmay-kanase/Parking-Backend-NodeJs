import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import * as parkingHistoryController from "../controllers/parkingHistoryController.js";

const router = Router();

router.post("/", asyncHandler(parkingHistoryController.createParkingHistory));
router.get("/user/:userId", asyncHandler(parkingHistoryController.getHistoryByUserId));
router.get("/vehicle/:vehicleId", asyncHandler(parkingHistoryController.getHistoryByVehicleId));

export default router;
