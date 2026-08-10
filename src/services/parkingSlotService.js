import { ParkingSlot } from "../models/ParkingSlot.js";
import { Booking } from "../models/Booking.js";

export async function getAllSlots() {
  return ParkingSlot.find();
}

export async function getSlotById(slotId) {
  return ParkingSlot.findById(slotId);
}

export async function getSlotsByUserId(userId) {
  return ParkingSlot.find({ userId });
}

export async function getAvailableSlots() {
  return ParkingSlot.find({ isAvailable: true });
}

export async function createSlot(slot) {
  console.log(slot);
  return new ParkingSlot(slot).save();
}

export async function getSlotsByParkingId(parkingId) {
  return ParkingSlot.find({ parkingId });
}

export async function updateSlot(slotId, updatedSlot) {
  const slot = await ParkingSlot.findById(slotId);
  if (!slot) {
    throw new Error("Parking Slot not found");
  }

  if (updatedSlot.slotNumber != null) slot.slotNumber = updatedSlot.slotNumber;
  if (updatedSlot.location != null) slot.location = updatedSlot.location;
  if (updatedSlot.pricePerHour) slot.pricePerHour = updatedSlot.pricePerHour;
  if (updatedSlot.vehicleType != null) slot.vehicleType = updatedSlot.vehicleType;
  if (updatedSlot.isAvailable !== undefined) slot.isAvailable = updatedSlot.isAvailable;

  return slot.save();
}

export async function deleteSlot(slotId) {
  await ParkingSlot.findByIdAndDelete(slotId);
}

export async function getAvailableSlotsByTime(parkingId, vehicleType, start, end) {
  const slots = await ParkingSlot.find({ parkingId });
  const matching = slots.filter(
    (slot) => (slot.vehicleType || "").toLowerCase() === (vehicleType || "").toLowerCase()
  );
  console.log("Slots", matching);

  const available = [];
  for (const slot of matching) {
    const conflicts = await Booking.find({
      slotId: slot._id,
      startTime: { $lt: end },
      endTime: { $gt: start },
    });
    console.log("Conflicts", conflicts);
    if (conflicts.length === 0) {
      available.push(slot);
    }
  }
  return available;
}

// Equivalent to ParkingSlotRepository#findAvailableSlotsByAggregation: slots
// in a parking lot with no overlapping booking for the given time window.
// (Named distinctly from getAvailableSlots() above since JS doesn't support
// overloading the way the Java service's two getAvailableSlots(...) do.)
export async function getAvailableSlotsInWindow(parkingId, startTime, endTime) {
  const results = await ParkingSlot.aggregate([
    { $match: { parkingId } },
    {
      $lookup: {
        from: "bookings",
        let: { slotIdStr: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$slotId", "$$slotIdStr"] },
                  { $lt: ["$startTime", new Date(endTime)] },
                  { $gt: ["$endTime", new Date(startTime)] },
                ],
              },
            },
          },
        ],
        as: "overlappingBookings",
      },
    },
    { $match: { overlappingBookings: { $size: 0 } } },
    { $project: { overlappingBookings: 0 } },
  ]);

  // hydrate as Mongoose documents so the standard toJSON id-transform applies
  return results.map((doc) => ParkingSlot.hydrate(doc));
}
