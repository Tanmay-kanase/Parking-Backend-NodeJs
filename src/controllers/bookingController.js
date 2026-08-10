import * as bookingService from "../services/bookingService.js";
import * as emailTemplateService from "../services/emailTemplateService.js";
import * as emailService from "../services/emailService.js";

export async function createBooking(req, res) {
  try {
    const savedBooking = await bookingService.createBooking(req.body);

    const subject = "Your Parking Slot Booking is Confirmed!";
    const emailContent = emailTemplateService.generateBookingTemplate(savedBooking);

    await emailService.sendBookingConfirmation(req.body.email, subject, emailContent, savedBooking);

    console.log("Booking confirmation email sent to", req.body.email);

    res.status(201).json(savedBooking);
  } catch (e) {
    console.log("❌ Error during booking:", e.message);
    res.status(500).send();
  }
}

export async function getBookingById(req, res) {
  res.json(await bookingService.getBookingById(req.params.bookingId));
}

export async function getBookingsByUserId(req, res) {
  res.json(await bookingService.getBookingsByUserId(req.params.userId));
}

export async function updateBooking(req, res) {
  res.json(await bookingService.updateBooking(req.body));
}

export async function getBookingsByLocationId(req, res) {
  res.json(await bookingService.getBookingsByLocationId(req.params.locationId));
}

export async function deleteBooking(req, res) {
  await bookingService.deleteBooking(req.params.bookingId);
  res.status(200).send();
}

export async function completeBooking(req, res) {
  const request = req.body;
  console.log("====== BACKEND DEBUG: REQUEST RECEIVED ======");
  console.log(`1. Received StartTime: [${request.startTime}]`);
  console.log(`2. Received EndTime:   [${request.endTime}]`);
  console.log("=============================================");

  try {
    const booking = await bookingService.completeBooking(request);
    res.json(booking);
  } catch (e) {
    res.status(500).send(`Booking failed: ${e.message}`);
  }
}
