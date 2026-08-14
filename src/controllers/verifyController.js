import { verifyBooking } from "../services/verifyService.js";

export const verifyBookingController = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const response = await verifyBooking(bookingId);

    return res.status(200).json(response);
  } catch (error) {
    console.error("Verify Booking Error:", error);

    return res.status(404).json({
      message: error.message,
    });
  }
};
