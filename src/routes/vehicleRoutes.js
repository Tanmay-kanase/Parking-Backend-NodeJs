import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import * as vehicleController from "../controllers/vehicleController.js";

const router = Router();

router.get("/user/:userId", asyncHandler(vehicleController.getVehiclesByUserId));
router.post("/add", asyncHandler(vehicleController.addVehicle));

export default router;
