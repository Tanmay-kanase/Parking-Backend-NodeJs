import crypto from "crypto";

export function verifySignature(orderId, paymentId, razorpaySignature, secret) {
  try {
    const payload = `${orderId}|${paymentId}`;
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(payload, "utf8")
      .digest("hex");

    console.log("EXPECTED:", razorpaySignature);
    console.log("GENERATED:", generatedSignature);

    return generatedSignature === razorpaySignature;
  } catch (e) {
    return false;
  }
}
