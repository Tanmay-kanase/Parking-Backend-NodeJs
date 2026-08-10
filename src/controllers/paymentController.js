import Razorpay from "razorpay";
import * as paymentService from "../services/paymentService.js";
import { env } from "../config/env.js";

export async function getPaymentsByUserId(req, res) {
  res.json(await paymentService.getPaymentsByUserId(req.params.userId));
}

export async function getPaymentsByStatus(req, res) {
  res.json(await paymentService.getPaymentsByStatus(req.params.status));
}

export async function createPayment(req, res) {
  res.json(await paymentService.savePayment(req.body));
}

export async function createOrder(req, res) {
  try {
    const amount = parseInt(req.body.amount, 10);

    const client = new Razorpay({ key_id: env.razorpay.keyId, key_secret: env.razorpay.keySecret });

    const order = await client.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "txn_123456",
    });

    res.json({ id: order.id, amount: order.amount, currency: order.currency });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
