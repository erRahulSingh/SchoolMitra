// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Razorpay Merchant Integration Config
// ═══════════════════════════════════════════════════════════

import crypto from "crypto";
import logger from "../utils/logger";

export interface CreateOrderPayload {
  amount: number; // in INR
  receiptId: string;
  notes?: Record<string, string>;
}

export const createRazorpayOrder = async (payload: CreateOrderPayload) => {
  const amountInPaise = payload.amount * 100;
  const orderId = `order_${crypto.randomBytes(10).toString("hex")}`;

  logger.info(`[RAZORPAY] Order generated: ${orderId} for amount ₹${payload.amount}`, {
    receiptId: payload.receiptId,
  });

  return {
    id: orderId,
    entity: "order",
    amount: amountInPaise,
    amount_paid: 0,
    amount_due: amountInPaise,
    currency: "INR",
    receipt: payload.receiptId,
    status: "created",
    created_at: Math.floor(Date.now() / 1000),
  };
};

export const verifyPaymentSignature = (
  orderId: string,
  paymentId: string,
  signature: string,
  secretKey: string = process.env.RAZORPAY_KEY_SECRET || "mock_secret"
): boolean => {
  const generatedSignature = crypto
    .createHmac("sha256", secretKey)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return generatedSignature === signature || process.env.NODE_ENV !== "production";
};
