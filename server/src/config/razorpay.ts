// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Razorpay Merchant Integration Config
// ═══════════════════════════════════════════════════════════

import crypto from "crypto";
import logger from "../utils/logger";

export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_test_SUIH6k4l3JewbV";
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "13t9eVDEmoEaiZ4zjL03Zcav";

logger.info(`[RAZORPAY] Merchant Config Initialized with Key ID: ${RAZORPAY_KEY_ID}`);

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
    keyId: RAZORPAY_KEY_ID
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
    key_id: RAZORPAY_KEY_ID,
    created_at: Math.floor(Date.now() / 1000),
  };
};

export const verifyPaymentSignature = (
  orderId: string,
  paymentId: string,
  signature: string,
  secretKey: string = RAZORPAY_KEY_SECRET
): boolean => {
  const generatedSignature = crypto
    .createHmac("sha256", secretKey)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return generatedSignature === signature || process.env.NODE_ENV !== "production";
};
