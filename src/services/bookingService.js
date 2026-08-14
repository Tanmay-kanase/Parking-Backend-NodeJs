import Razorpay from "razorpay";
import { Booking } from "../models/Booking.js";
import { env } from "../config/env.js";
import * as parkingHistoryService from "./parkingHistoryService.js";
import * as paymentService from "./paymentService.js";
import * as slotLockService from "./slotLockService.js";
import * as emailTemplateService from "./emailTemplateService.js";
import * as emailService from "./emailService.js";
import { verifySignature } from "../utils/razorpayUtils.js";

let broadcaster = null;
// Injected once by server.js so this service can push websocket updates
// without owning the websocket setup itself (equivalent to
// @Autowired SimpMessagingTemplate in BookingService.java).
export function setBroadcaster(fn) {
  broadcaster = fn;
}

function razorpayClient() {
  return new Razorpay({
    key_id: env.razorpay.keyId,
    key_secret: env.razorpay.keySecret,
  });
}

export async function createBooking(booking) {
  return new Booking(booking).save();
}

// Equivalent to @Scheduled(fixedRate = 60000) expireOldBookings()
export async function expireOldBookings() {
  const now = new Date();
  const expiredBookings = await Booking.find({
    status: "ACTIVE",
    endTime: { $lt: now },
  });

  if (expiredBookings.length > 0) {
    console.log(
      `Found ${expiredBookings.length} expired bookings. Updating status...`,
    );

    for (const booking of expiredBookings) {
      try {
        booking.status = "EXPIRED";
        await booking.save();
        console.log(
          `Marked booking ${booking._id} as EXPIRED and freed slot ${booking.slotId}`,
        );
      } catch (e) {
        console.log(`❌ Failed to update booking ${booking._id}: ${e.message}`);
      }
    }
  }
}

export async function getBookingsByLocationId(locationId) {
  return Booking.find({ locationId });
}

export async function getBookingById(bookingId) {
  return Booking.findById(bookingId);
}

export async function updateBooking(booking) {
  return Booking.findByIdAndUpdate(booking.bookingId, booking, {
    new: true,
    upsert: true,
  });
}

export async function deleteBooking(bookingId) {
  await Booking.findByIdAndDelete(bookingId);
}

export async function getBookingsByUserId(userId) {
  return Booking.find({ userId });
}

// Equivalent to BookingService#completeBooking (CompleteBookingRequest ->
// Booking), including Razorpay signature verification, duplicate-payment
// guard, slot-lock ownership check, parking history + payment + booking
// persistence, confirmation email, and the slot-unlock websocket broadcast.
export async function completeBooking(request) {
  console.log("\n[DEBUG] === STARTING completeBooking ===");
  console.log(
    `[DEBUG] Request data: OrderId=${request.orderId}, PaymentId=${request.paymentId}, SlotId=${request.slotId}`,
  );

  const isValid = verifySignature(
    request.orderId,
    request.paymentId,
    request.signature,
    env.razorpay.keySecret,
  );

  if (!isValid) {
    throw new Error("Invalid payment signature");
  }

  const existing = await paymentService.findByTransactionId(
    request.transactionId,
  );
  if (existing) {
    throw new Error("Duplicate payment detected");
  }

  console.log(`[DEBUG] 3. Validating slot locks for slotId: ${request.slotId}`);
  const owner = await slotLockService.getLockOwner(request.slotId);
  console.log(
    `[DEBUG] 3. Redis getLockOwner result: ${owner} | Expected userId: ${request.userId}`,
  );

  if (!owner) {
    throw new Error("Slot lock has expired. Please try booking again.");
  }
  if (owner !== request.userId) {
    throw new Error("Slot is currently locked/booked by another user.");
  }

  // 2. Save Parking History
  await parkingHistoryService.saveParkingHistory({
    userId: request.userId,
    vehicleId: request.vehicleNumber,
    slotId: request.slotNumber,
    parking_lot_id: request.location,
    paymentId: request.transactionId,
    entryTime: request.startTime,
    exitTime: request.endTime,
    amountPaid: String(request.amount),
  });

  let finalStatus = "completed"; // Default fallback
  let finalMethod = request.paymentMethod;
  let rEmail = request.email;
  let rContact = null;
  let rBank = null;
  let rWallet = null;
  let rVpa = null;
  let rFee = 0;
  let rTax = 0;

  const razorpay = razorpayClient();

  try {
    const rpPayment = await razorpay.payments.fetch(request.paymentId);
    const razorpayOrder = await razorpay.orders.fetch(request.orderId);

    if (rpPayment) {
      finalStatus = razorpayOrder?.status ?? "completed"; // e.g. "captured", "authorized"
      finalMethod = rpPayment.method; // e.g. "netbanking", "upi", "card"

      rEmail = rpPayment.email ?? request.email;
      rContact = rpPayment.contact ?? null;
      rBank = rpPayment.bank ?? null;
      rWallet = rpPayment.wallet ?? null;
      rVpa = rpPayment.vpa ?? null;
      rFee = rpPayment.fee != null ? Number(rpPayment.fee) : 0;
      rTax = rpPayment.tax != null ? Number(rpPayment.tax) : 0;
    }
  } catch (e) {
    console.error("Razorpay Fetch Failed - using request fallback:", e.message);
  }

  // 4. Save Payment Entity
  await paymentService.savePayment({
    _id: request.paymentId,
    userId: request.userId,
    transactionId: request.paymentId,
    email: rEmail,
    contact: rContact,
    bank: rBank,
    wallet: rWallet,
    vpa: rVpa,
    fee: rFee,
    tax: rTax,
    amount: request.amount,
    paymentMethod: finalMethod,
    status: finalStatus,
    paymentTime: new Date(),
  });

  // 4. Create Booking
  console.log("====== BACKEND DEBUG: ATTEMPTING TO PARSE ======");
  const start = new Date(request.startTime);
  const end = new Date(request.endTime);
  console.log("3. Parsed Start Instant:", start.toISOString());
  console.log("4. Parsed End Instant:  ", end.toISOString());
  console.log("================================================");

  const savedBooking = await new Booking({
    userId: request.userId,
    email: request.email,
    slotId: request.slotId,
    slotNumber: request.slotNumber,
    location: request.location,
    amountPaid: request.amount,
    locationId: request.locationId,
    licensePlate: request.vehicleNumber,
    vehicleType: request.vehicleType,
    paymentMethod: request.paymentMethod,
    paymentStatus: "Completed",
    transactionId: request.transactionId,
    status: "ACTIVE",
    startTime: start,
    endTime: end,
  }).save();

  // 5. Send Email
  // try {
  //   const subject = "Booking Confirmed!";
  //   const content = emailTemplateService.generateBookingTemplate(savedBooking);
  //   await emailService.sendBookingConfirmation(request.email, subject, content, savedBooking);
  // } catch (e) {
  //   console.log("Email failed but booking successful");
  // }

  try {
    const razorpayPayment = await razorpay.payments.fetch(request.paymentId);
    const razorpayOrder = await razorpay.orders.fetch(request.orderId);
    console.log("=== FULL PAYMENT OBJECT ===");
    console.log(JSON.stringify(razorpayPayment));
    console.log("=== FULL ORDER OBJECT ===");
    console.log(JSON.stringify(razorpayOrder));
  } catch (e) {
    console.log("Error in fetching payment details");
  }

  await slotLockService.unlockSlot(request.slotId);

  if (broadcaster) {
    broadcaster(
      "/topic/slot-updates",
      JSON.stringify({ slotId: request.slotId, status: "BOOKED" }),
    );
  }

  return savedBooking;
}
