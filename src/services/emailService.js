import nodemailer from "nodemailer";
import { env } from "../config/env.js";
import { generateReceipt } from "../utils/pdfGenerator.js";
import { generateCalendarInvite } from "../utils/icalGenerator.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: env.mail.username,
    pass: env.mail.password,
  },
});

// In-memory OTP store (matches the ConcurrentHashMap in EmailService.java)
const otpStorage = new Map();

export async function sendBookingConfirmation(
  toEmail,
  subject,
  htmlBody,
  booking,
) {
  try {
    const pdfBuffer = await generateReceipt(booking);
    const icsBuffer = generateCalendarInvite(booking);

    await transporter.sendMail({
      from: "tanmaykanase07@gmail.com", // Replace with your verified sender
      to: toEmail,
      subject,
      html: htmlBody,
      attachments: [
        { filename: "ParkEasy_Receipt.pdf", content: pdfBuffer },
        { filename: "ParkingEvent.ics", content: icsBuffer },
      ],
    });

    console.log(`✅ HTML Email sent successfully to ${toEmail}`);
  } catch (e) {
    console.log(`❌ Failed to send email to ${toEmail}: ${e.message}`);
    console.error(e);
  }
}

export function generateOTP() {
  return String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
}

export async function sendOtpEmail(toEmail) {
  const otp = generateOTP();
  otpStorage.set(toEmail, otp);

  await transporter.sendMail({
    to: toEmail,
    subject: "Your OTP for Registration",
    text: `Your OTP is: ${otp}\nValid for 5 minutes.`,
  });

  return otp;
}

export function verifyOtp(email, otp) {
  const storedOtp = otpStorage.get(email);
  return storedOtp !== undefined && storedOtp === otp;
}

export function clearOtp(email) {
  otpStorage.delete(email);
}
