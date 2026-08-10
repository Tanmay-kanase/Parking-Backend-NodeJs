import { Vehicle } from "../models/Vehicle.js";

export async function getVehiclesByUserId(userId) {
  return Vehicle.find({ userId });
}

export async function addVehicle(vehicle) {
  return new Vehicle(vehicle).save();
}
