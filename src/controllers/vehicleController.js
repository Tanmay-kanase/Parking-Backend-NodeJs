import * as vehicleService from "../services/vehicleService.js";

export async function getVehiclesByUserId(req, res) {
  res.json(await vehicleService.getVehiclesByUserId(req.params.userId));
}

export async function addVehicle(req, res) {
  res.json(await vehicleService.addVehicle(req.body));
}
