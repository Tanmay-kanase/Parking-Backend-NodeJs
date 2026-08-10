import { Payment } from "../models/Payment.js";

export async function getPaymentsByUserId(userId) {
  return Payment.find({ userId });
}

export async function getPaymentsByStatus(status) {
  return Payment.find({ status });
}

export async function savePayment(payment) {
  return new Payment(payment).save();
}

export async function findByTransactionId(transactionId) {
  return Payment.findOne({ transactionId });
}
