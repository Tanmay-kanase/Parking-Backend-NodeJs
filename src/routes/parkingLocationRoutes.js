import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import * as parkingLocationController from "../controllers/parkingLocationController.js";

const router = Router();

router.get("/", asyncHandler(parkingLocationController.getAllParkingLocations));
router.get("/getLocationsByAddress", asyncHandler(parkingLocationController.getLocationsByAddress));
router.get("/user/:userId", asyncHandler(parkingLocationController.getByUserId));
router.get("/city/:city", asyncHandler(parkingLocationController.getByCity));
router.get("/search", asyncHandler(parkingLocationController.searchLocations));
router.get("/nearby", asyncHandler(parkingLocationController.getNearbyParkings));
router.get("/:id", asyncHandler(parkingLocationController.getParkingLocationById));
router.post("/", asyncHandler(parkingLocationController.addParkingLocation));
router.put("/:id", asyncHandler(parkingLocationController.updateParkingLocation));
router.delete("/:id", asyncHandler(parkingLocationController.deleteParkingLocation));
router.post("/:id/add-slot", asyncHandler(parkingLocationController.addSlotToParking));

export default router;
