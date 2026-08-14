import { Booking } from "../models/Booking.js";

export const verifyBooking = async (bookingId) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    return {
      message: `Booking not found , may be wrong QR`,
      status: "N/A",
    };
  }

  const now = new Date();

  // Too Early
  if (now < booking.startTime) {
    const minutes = Math.floor(
      (booking.startTime.getTime() - now.getTime()) / (1000 * 60),
    );

    return {
      message: `You are too early. Parking starts in ${minutes} minutes. Please wait or contact the parking owner.`,
      status: booking.status,
    };
  }

  // Booking expired before entry
  if (now > booking.endTime && booking.status === "BOOKED") {
    booking.status = "EXPIRED";
    await booking.save();

    return {
      message:
        "You were too late for parking. Booking expired and refund will be processed.",
      status: "EXPIRED",
    };
  }

  // Entry Scan
  if (booking.status === "BOOKED") {
    booking.status = "ACTIVE";

    // NOTE:
    // Your Java code sets endTime(now) here.
    // I'm keeping it identical, but you may want check-in time instead.
    booking.endTime = now;

    await booking.save();

    return {
      message: "You are welcome.",
      status: "ACTIVE",
    };
  }

  // Exit Scan
  if (booking.status === "ACTIVE") {
    booking.status = "COMPLETED";
    booking.endTime = now;

    await booking.save();

    return {
      message: "Come again. Bye!",
      status: "COMPLETED",
    };
  }

  // Already completed
  if (booking.status === "COMPLETED") {
    return {
      message: "This booking has already been completed.",
      status: "COMPLETED",
    };
  }

  // Already expired or invalid state
  return {
    message: "This booking is no longer valid.",
    status: booking.status,
  };
};
