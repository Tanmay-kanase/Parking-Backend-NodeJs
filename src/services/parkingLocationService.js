import { ParkingLocation } from "../models/ParkingLocation.js";
import { ParkingSlot } from "../models/ParkingSlot.js";
import { Booking } from "../models/Booking.js";
import { User } from "../models/User.js";

export async function getAllParkingLocations() {
  return ParkingLocation.find();
}

export async function getParkingLocationsByUserId(userId) {
  return ParkingLocation.find({ userId });
}

export async function getParkingLocationById(id) {
  return ParkingLocation.findById(id);
}

export async function addParkingLocation(location) {
  if (location.lat != null && location.lng != null) {
    location.location = { type: "Point", coordinates: [location.lng, location.lat] };
  }

  let fullAddress = "";
  if (location.address) fullAddress += location.address.trim();
  if (location.city && location.city.trim() !== "") fullAddress += `, ${location.city.trim()}`;
  if (location.state && location.state.trim() !== "") fullAddress += `, ${location.state.trim()}`;
  if (location.zipCode && location.zipCode.trim() !== "") fullAddress += ` ${location.zipCode.trim()}`;
  location.address = fullAddress;

  // lat/lng are transient in the Java model, don't persist them as schema fields
  delete location.lat;
  delete location.lng;

  return new ParkingLocation(location).save();
}

function buildUserDTO(user) {
  if (!user) return undefined;
  return { name: user.name, phone: user.phone };
}

function countSlotsByType(slots, bookedSlotIds) {
  const counts = { bike: 0, sedan: 0, truck: 0, bus: 0 };
  for (const slot of slots) {
    if (bookedSlotIds.has(String(slot._id))) continue;
    const type = (slot.vehicleType || "").toLowerCase();
    if (type === "bike") counts.bike++;
    else if (type === "sedan" || type === "car") counts.sedan++;
    else if (type === "truck") counts.truck++;
    else if (type === "bus") counts.bus++;
  }
  return counts;
}

export async function getNearbyParkings(lat, lng, radiusInKm) {
  console.log("🔍 Finding nearby parkings...");
  console.log("📍 Latitude:", lat);
  console.log("📍 Longitude:", lng);
  console.log("📏 Radius (KM):", radiusInKm);

  const radiusInMeters = radiusInKm * 1000;

  const nearbyLocations = await ParkingLocation.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [lng, lat] },
        $maxDistance: radiusInMeters,
      },
    },
  });

  const now = new Date();
  const responses = [];

  for (const location of nearbyLocations) {
    const allSlots = await ParkingSlot.find({ parkingId: String(location._id) });
    const activeBookings = await Booking.find({
      locationId: String(location._id),
      startTime: { $lte: now },
      endTime: { $gte: now },
    });
    const bookedSlotIds = new Set(activeBookings.map((b) => b.slotId));

    const counts = countSlotsByType(allSlots, bookedSlotIds);

    console.log(
      "    Location (lat,lng):",
      location.location?.coordinates?.[1],
      location.location?.coordinates?.[0]
    );

    const response = {
      ...location.toObject(),
      bikeSlots: counts.bike,
      sedanSlots: counts.sedan,
      truckSlots: counts.truck,
      busSlots: counts.bus,
      available: counts.bike + counts.sedan + counts.truck + counts.bus > 0,
      lat: location.location?.coordinates?.[1],
      lng: location.location?.coordinates?.[0],
      totalSlots: allSlots.length,
    };

    const user = await User.findById(location.userId);
    if (user) response.user = buildUserDTO(user);

    responses.push(response);
  }

  return responses;
}

// Equivalent to the @Aggregation on ParkingLocationRepository#getParkingLocationsByAddress
export async function getLocationsByAddress(address) {
  const locations = await ParkingLocation.aggregate([
    { $match: { address: { $regex: address, $options: "i" } } },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user_info",
      },
    },
    { $unwind: { path: "$user_info", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "parking_slots",
        let: { locationIdStr: "$_id" },
        pipeline: [{ $match: { $expr: { $eq: ["$parkingId", "$$locationIdStr"] } } }],
        as: "slots",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        address: 1,
        city: 1,
        state: 1,
        zipCode: 1,
        evCharging: { $ifNull: ["$evCharging", false] },
        cctvCamera: { $ifNull: ["$cctvCamera", false] },
        washing: { $ifNull: ["$washing", false] },
        lat: { $arrayElemAt: ["$location.coordinates", 1] },
        lng: { $arrayElemAt: ["$location.coordinates", 0] },
        totalSlots: { $size: "$slots" },
        bikeSlots: {
          $size: { $filter: { input: "$slots", as: "slot", cond: { $eq: ["$$slot.vehicleType", "bike"] } } },
        },
        sedanSlots: {
          $size: { $filter: { input: "$slots", as: "slot", cond: { $eq: ["$$slot.vehicleType", "sedan"] } } },
        },
        truckSlots: {
          $size: { $filter: { input: "$slots", as: "slot", cond: { $eq: ["$$slot.vehicleType", "truck"] } } },
        },
        busSlots: {
          $size: { $filter: { input: "$slots", as: "slot", cond: { $eq: ["$$slot.vehicleType", "bus"] } } },
        },
        available: {
          $gt: [
            { $size: { $filter: { input: "$slots", as: "slot", cond: { $eq: ["$$slot.isAvailable", true] } } } },
            0,
          ],
        },
        user: {
          id: "$user_info._id",
          name: "$user_info.name",
          email: "$user_info.email",
          photo: "$user_info.photo",
          role: "$user_info.role",
        },
      },
    },
  ]);

  return locations.map((loc) => {
    const { _id, ...rest } = loc;
    return { locationId: _id, ...rest };
  });
}

export async function updateParkingLocation(id, updatedLocation) {
  const existing = await ParkingLocation.findById(id);
  if (!existing) return null;

  existing.name = updatedLocation.name;
  existing.address = updatedLocation.address;
  existing.city = updatedLocation.city;
  existing.state = updatedLocation.state;
  existing.zipCode = updatedLocation.zipCode;
  existing.slotIds = updatedLocation.slotIds;

  return existing.save();
}

export async function deleteParkingLocation(id) {
  const exists = await ParkingLocation.exists({ _id: id });
  if (!exists) return false;
  await ParkingLocation.findByIdAndDelete(id);
  return true;
}

export async function searchLocations(searchLoc) {
  const locations = await ParkingLocation.find(
    { address: { $regex: searchLoc, $options: "i" } },
    { address: 1 }
  );

  return locations.map((location) => ({
    locationId: location._id,
    address: location.address,
  }));
}

export async function addSlotToParking(locationId, slotId) {
  const location = await ParkingLocation.findById(locationId);
  if (location) {
    location.slotIds.push(slotId);
    await location.save();
  }
}

export async function getParkingLocationsByCity(city) {
  const locations = await ParkingLocation.find({ city: { $regex: city, $options: "i" } });

  const responses = [];

  for (const location of locations) {
    // NOTE: kept faithful to the original Java implementation, which fetches
    // the slots but never actually uses them to populate the counts below
    // (they always come back as 0 / unavailable).
    await ParkingSlot.find({ parkingId: String(location._id) });

    const response = {
      ...location.toObject(),
      bikeSlots: 0,
      sedanSlots: 0,
      truckSlots: 0,
      busSlots: 0,
      available: false,
    };

    const user = await User.findById(location.userId);
    if (user) response.user = buildUserDTO(user);

    console.log("City =", city);
    console.log("Found locations =", locations.length);
    for (const loc of locations) {
      console.log("LocationID:", loc._id);
    }

    responses.push(response);
  }

  return responses;
}
