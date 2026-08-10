import * as parkingLocationService from "../services/parkingLocationService.js";

export async function getAllParkingLocations(req, res) {
  res.json(await parkingLocationService.getAllParkingLocations());
}

export async function getLocationsByAddress(req, res) {
  const responses = await parkingLocationService.getLocationsByAddress(req.query.address);
  if (responses.length === 0) {
    return res.status(204).send();
  }
  res.json(responses);
}

export async function getByUserId(req, res) {
  res.json(await parkingLocationService.getParkingLocationsByUserId(req.params.userId));
}

export async function getParkingLocationById(req, res) {
  const location = await parkingLocationService.getParkingLocationById(req.params.id);
  if (!location) return res.status(404).send();
  res.json(location);
}

export async function getByCity(req, res) {
  res.json(await parkingLocationService.getParkingLocationsByCity(req.params.city));
}

export async function addParkingLocation(req, res) {
  res.json(await parkingLocationService.addParkingLocation(req.body));
}

export async function searchLocations(req, res) {
  res.json(await parkingLocationService.searchLocations(req.query.searchLoc));
}

export async function updateParkingLocation(req, res) {
  const updated = await parkingLocationService.updateParkingLocation(req.params.id, req.body);
  if (!updated) return res.status(404).send();
  res.json(updated);
}

export async function deleteParkingLocation(req, res) {
  const deleted = await parkingLocationService.deleteParkingLocation(req.params.id);
  if (!deleted) return res.status(404).send();
  res.send("Parking Location Deleted");
}

export async function addSlotToParking(req, res) {
  const slotId = typeof req.body === "string" ? req.body : req.body?.slotId ?? req.body;
  await parkingLocationService.addSlotToParking(req.params.id, slotId);
  res.send("Slot added successfully.");
}

export async function getNearbyParkings(req, res) {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const radiusKm = req.query.radiusKm != null ? parseFloat(req.query.radiusKm) : 500000;

  const results = await parkingLocationService.getNearbyParkings(lat, lng, radiusKm);
  res.json(results);
}
