import * as parkingHistoryService from "../services/parkingHistoryService.js";

export async function createParkingHistory(req, res) {
  res.json(await parkingHistoryService.saveParkingHistory(req.body));
}

export async function getHistoryByUserId(req, res) {
  res.json(await parkingHistoryService.getHistoryByUserId(req.params.userId));
}

export async function getHistoryByVehicleId(req, res) {
  res.json(await parkingHistoryService.getHistoryByVehicleId(req.params.vehicleId));
}
