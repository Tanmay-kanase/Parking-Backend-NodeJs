import { ParkingHistory } from "../models/ParkingHistory.js";

export async function getHistoryByUserId(userId) {
  return ParkingHistory.find({ userId });
}

export async function getHistoryByVehicleId(vehicleId) {
  return ParkingHistory.find({ vehicleId });
}

export async function saveParkingHistory(parkingHistory) {
  return new ParkingHistory(parkingHistory).save();
}
