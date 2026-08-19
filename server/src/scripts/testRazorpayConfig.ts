// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Razorpay Merchant Integration Verification
// ═══════════════════════════════════════════════════════════

import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../.env") });

import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, createRazorpayOrder, verifyPaymentSignature } from "../config/razorpay";
import crypto from "crypto";

async function run() {
  console.log("🚀 Verifying Razorpay Merchant Credentials...\n");

  console.log(`Key ID: ${RAZORPAY_KEY_ID}`);
  console.log(`Key Secret: ${RAZORPAY_KEY_SECRET ? "****************" : "MISSING"}`);

  if (RAZORPAY_KEY_ID !== "rzp_test_SUIH6k4l3JewbV") {
    throw new Error("Razorpay Key ID mismatch!");
  }
  if (RAZORPAY_KEY_SECRET !== "13t9eVDEmoEaiZ4zjL03Zcav") {
    throw new Error("Razorpay Key Secret mismatch!");
  }

  console.log("\nStep 1: Generating Test Razorpay Order...");
  const order = await createRazorpayOrder({ amount: 15000, receiptId: "REC-2026-TEST-99" });
  console.log("  -> Order Created:", order);

  console.log("\nStep 2: Testing HMAC SHA256 Payment Signature Verification...");
  const testOrderId = order.id;
  const testPaymentId = "pay_test_9988776655";
  const expectedSig = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(`${testOrderId}|${testPaymentId}`)
    .digest("hex");

  const isValid = verifyPaymentSignature(testOrderId, testPaymentId, expectedSig, RAZORPAY_KEY_SECRET);
  console.log(`  -> Generated HMAC Signature: ${expectedSig}`);
  console.log(`  -> Verification Result: ${isValid ? "PASSED ✅" : "FAILED ❌"}`);

  if (!isValid) throw new Error("Signature verification failed!");

  console.log("\n🎉 Razorpay Merchant Key Integration is 100% Verified & Active!\n");
}

run();
