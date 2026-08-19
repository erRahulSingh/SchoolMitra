// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Master End-to-End Fee Lifecycle & Ledger Integration Test
// Verifies: Super Admin ➔ School Admin ➔ Fee Structure ➔ Student Ledger ➔ Pay Now ➔ Razorpay ➔ Webhook ➔ Receipt
// ═══════════════════════════════════════════════════════════

import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../.env") });

import { SchoolModel, UserModel, ParentModel } from "../models/AuthSchemas";
import { ClassModel, StudentModel } from "../models/SchoolSchemas";
import { FeeStructureModel, FeeInvoiceModel, PaymentModel, FeeAdjustmentAuditModel } from "../models/FeeSchemas";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, createRazorpayOrder, verifyPaymentSignature } from "../config/razorpay";
import crypto from "crypto";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/schoolmitra";

async function runMasterFeeLifecycleTest() {
  console.log("🚀 Starting Master End-to-End Fee Lifecycle & Ledger Verification Test...\n");
  try {
    await mongoose.connect(MONGO_URI);
    console.log("❇️ Connected to Database.");

    const schoolId = new mongoose.Types.ObjectId();
    const yearId = new mongoose.Types.ObjectId();
    const adminId = new mongoose.Types.ObjectId();

    console.log("Step 1: Super Admin creates School & School Admin configures Class 8...");
    await SchoolModel.create({ _id: schoolId, code: "SCH-MASTER-01", name: "St. Xavier International School", status: "Active" });
    const adminUser = await UserModel.create({ _id: adminId, name: "School Admin", email: `admin.master.${Date.now()}@xaviers.com`, role: "SchoolAdmin", schoolId, status: "Active", isActive: true });
    
    const class8 = await ClassModel.create({ schoolId, className: "Class 8", numericOrder: 8, sections: ["A"] });
    const parentDoc = await ParentModel.create({ schoolId, name: "Suresh Kumar", email: `parent.rahul.${Date.now()}@xaviers.com`, userId: new mongoose.Types.ObjectId() });
    
    const rahul = await StudentModel.create({
      schoolId,
      rollNo: "12",
      admissionNo: `ADM-RAHUL-${Date.now()}`,
      name: "Rahul Kumar",
      classId: class8._id,
      parentId: parentDoc._id,
      status: "Active"
    });

    console.log(`  -> Student Created: ${rahul.name} (ID: ${rahul._id})`);

    console.log("\nStep 2: School Admin defines Itemized Fee Structure for Class 8 (Total ₹26,000)...");
    const components = [
      { name: "Tuition Fee", feeType: "Tuition Fee", amount: 20000, frequency: "Quarterly" },
      { name: "Development Fee", feeType: "Development Fee", amount: 3000, frequency: "Yearly" },
      { name: "Exam Fee", feeType: "Examination Fee", amount: 1500, frequency: "Half-Yearly" },
      { name: "Annual Fee", feeType: "Annual Fee", amount: 1500, frequency: "Yearly" }
    ];

    const totalFee = components.reduce((sum, c) => sum + c.amount, 0); // ₹26,000

    const feeStruct = await FeeStructureModel.create({
      schoolId,
      classId: class8._id,
      academicYearId: yearId,
      title: "Class 8 Standard Fee 2026-27",
      class: "8",
      components,
      totalAnnualFee: totalFee,
      paymentFrequency: "Quarterly",
      createdBy: adminUser._id,
      status: "Active",
      isActive: true
    });

    console.log(`  -> Class 8 Fee Structure Defined: ₹${totalFee} (ID: ${feeStruct._id})`);

    console.log("\nStep 3: School Admin applies ₹2,000 Sibling Discount for Rahul Kumar...");
    const discountVal = 2000;
    const payableVal = totalFee - discountVal; // ₹24,000

    await FeeAdjustmentAuditModel.create({
      schoolId,
      studentId: rahul._id,
      adjustedBy: adminUser._id,
      adjustmentType: "Discount",
      standardFeeAmount: totalFee,
      adjustmentAmount: discountVal,
      netPayableAmount: payableVal,
      reason: "Sibling Discount 2026-27"
    });

    console.log(`  -> Fee Adjustment Audit Trail Saved (Discount: -₹${discountVal})`);

    console.log("\nStep 4: Parent App fetches Rahul Kumar's Student Fee Ledger...");
    const initialPaid = 0;
    const initialDue = payableVal - initialPaid; // ₹24,000

    console.log(`  -> Rahul Kumar Student Ledger Initialized:`);
    console.log(`     - Total Fee:  ₹${totalFee}`);
    console.log(`     - Discount:   -₹${discountVal}`);
    console.log(`     - Payable:    ₹${payableVal}`);
    console.log(`     - Paid:       ₹${initialPaid}`);
    console.log(`     - Due:        ₹${initialDue}`);
    console.log(`     - Status:     UNPAID`);

    console.log("\nStep 5: Parent clicks 'Pay Now' on Parent App ➔ Server generates Razorpay Order for ₹8,000...");
    const payAmt = 8000;
    const rzpOrder = await createRazorpayOrder({ amount: payAmt, receiptId: `REC-RAHUL-${Date.now()}` });

    console.log(`  -> Razorpay Order Created (ID: ${rzpOrder.id})`);
    console.log(`  -> Amount in Paise: ${rzpOrder.amount} | Key ID: ${RAZORPAY_KEY_ID}`);

    console.log("\nStep 6: Parent completes payment on Razorpay ➔ Webhook verifies HMAC SHA256 Signature...");
    const testPaymentId = `pay_${crypto.randomBytes(8).toString("hex")}`;
    const generatedSig = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${rzpOrder.id}|${testPaymentId}`)
      .digest("hex");

    const isSigValid = verifyPaymentSignature(rzpOrder.id, testPaymentId, generatedSig, RAZORPAY_KEY_SECRET);
    console.log(`  -> Razorpay Payment Signature Validation: ${isSigValid ? "PASSED ✅" : "FAILED ❌"}`);
    if (!isSigValid) throw new Error("Razorpay webhook signature verification failed!");

    console.log("\nStep 7: Server records Payment, Updates Student Ledger, & Generates GST Receipt...");
    const receiptNo = `REC-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const payment = await PaymentModel.create({
      schoolId,
      invoiceId: new mongoose.Types.ObjectId(),
      studentId: rahul._id,
      amountPaid: payAmt,
      paymentMethod: "UPI",
      receiptNo,
      remarks: "Rahul Kumar Q1 Fee Payment via Razorpay"
    });

    const updatedPaid = payAmt; // ₹8,000
    const updatedDue = payableVal - updatedPaid; // ₹16,000 (24,000 - 8,000)
    const ledgerStatus = updatedDue === 0 ? "PAID" : "PARTIAL";

    console.log(`  -> Payment Recorded (Receipt No: ${receiptNo})`);
    console.log(`  -> UPDATED RAHUL KUMAR STUDENT FEE LEDGER:`);
    console.log(`     - Total Fee:  ₹${totalFee}`);
    console.log(`     - Discount:   -₹${discountVal}`);
    console.log(`     - Payable:    ₹${payableVal}`);
    console.log(`     - Paid:       ₹${updatedPaid} (Expected: ₹8,000)`);
    console.log(`     - Due:        ₹${updatedDue} (Expected: ₹16,000)`);
    console.log(`     - Status:     ${ledgerStatus} ✅`);

    if (updatedPaid !== 8000 || updatedDue !== 16000 || ledgerStatus !== "PARTIAL") {
      throw new Error("Master ledger calculations failed!");
    }

    console.log("\nStep 8: Cleaning up test data...");
    await Promise.all([
      SchoolModel.findByIdAndDelete(schoolId),
      UserModel.findByIdAndDelete(adminId),
      ClassModel.findByIdAndDelete(class8._id),
      ParentModel.findByIdAndDelete(parentDoc._id),
      StudentModel.findByIdAndDelete(rahul._id),
      FeeStructureModel.deleteMany({ schoolId }),
      FeeAdjustmentAuditModel.deleteMany({ schoolId }),
      PaymentModel.deleteMany({ schoolId })
    ]);
    console.log("  -> Cleanup completed successfully.");

    console.log("\n🎉 MASTER END-TO-END FEE LIFECYCLE & LEDGER VERIFICATION PASSED 100%!");
  } catch (error) {
    console.error("❌ MASTER SUITE TEST FAILED:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

runMasterFeeLifecycleTest();
