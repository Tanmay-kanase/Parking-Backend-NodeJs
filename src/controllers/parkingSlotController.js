import * as parkingSlotService from "../services/parkingSlotService.js";
import { ParkingSlot } from "../models/ParkingSlot.js";

export async function getAllSlots(req, res) {
  res.json(await parkingSlotService.getAllSlots());
}

export async function getSlotById(req, res) {
  const slot = await parkingSlotService.getSlotById(req.params.slotId);
  if (!slot) return res.status(404).send();
  res.json(slot);
}

export async function getSlotsByUserId(req, res) {
  const slots = await parkingSlotService.getSlotsByUserId(req.params.userId);
  if (slots.length === 0) return res.status(404).send();
  res.json(slots);
}

export async function getSlotsByParkingId(req, res) {
  const slots = await parkingSlotService.getSlotsByParkingId(req.params.parkingId);
  if (slots.length === 0) return res.status(404).send();
  res.json(slots);
}

export async function getAvailableSlots(req, res) {
  res.json(await parkingSlotService.getAvailableSlots());
}

export async function createSlot(req, res) {
  const createdSlot = await parkingSlotService.createSlot(req.body);
  console.log("Received Request:", req.body);
  res.json(createdSlot);
}

export async function updateSlot(req, res) {
  try {
    console.log("\n\n\nBooking started\n\n\n");
    const slot = await parkingSlotService.updateSlot(req.params.slotId, req.body);
    res.json(slot);
  } catch (e) {
    res.status(404).send();
  }
}

export async function deleteSlot(req, res) {
  await parkingSlotService.deleteSlot(req.params.slotId);
  res.status(204).send();
}

export async function addParkingSlots(req, res) {
  const savedSlots = await ParkingSlot.insertMany(req.body);
  res.json(savedSlots);
}

export async function getAvailableSlotsByTime(req, res) {
  try {
    const { parkingId, vehicleType, startTime, endTime } = req.query;
    console.log("Available Time", parkingId, vehicleType, startTime, endTime);

    // NOTE: kept faithful to the original Java controller, which (likely by
    // mistake) passes startTime twice instead of startTime/endTime.
    const availableSlots = await parkingSlotService.getAvailableSlotsByTime(
      parkingId,
      vehicleType,
      new Date(startTime),
      new Date(startTime)
    );
    console.log("AvailableSlots :", availableSlots);
    res.json(availableSlots);
  } catch (e) {
    res.status(400).send();
  }
}

export async function getAvailableSlotsByVehicle(req, res) {
  const { parkingId, startTime, endTime } = req.query;
  res.json(
    await parkingSlotService.getAvailableSlotsInWindow(parkingId, new Date(startTime), new Date(endTime))
  );
}
