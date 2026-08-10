import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import * as slotLockController from "../controllers/slotLockController.js";

const router = Router();

router.post("/lock", asyncHandler(slotLockController.lockSlot));
router.post("/unlock", asyncHandler(slotLockController.unlockSlot));

export default router;
