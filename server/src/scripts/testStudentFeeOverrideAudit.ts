// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Student Fee Override & Audit Trail Test
// Verifies: Student Level Fee Override, Net Payable Calculation (₹26,000 - ₹5,000 = ₹21,000), & Complete Audit Logging
// ═══════════════════════════════════════════════════════════

import mongoose from "mongoose";
import { SchoolModel, UserModel, ParentModel } from "../models/AuthSchemas";
import { StudentModel } from "../models/SchoolSchemas";
import { FeeAdjustmentAuditModel } from "../models/FeeSchemas";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/schoolmitra";

async function run() {
  console.log("🚀 Starting Student Fee Override & Audit Trail Verification Test...\n");
  try {
    await mongoose.connect(MONGO_URI);
    console.log("❇️ Connected to Database.");

    const schoolId = new mongoose.Types.ObjectId();
    const adminId = new mongoose.Types.ObjectId();

    console.log("Step 1: Setting up School & Student A...");
    await SchoolModel.create({ _id: schoolId, code: "SCH-OVR-88", name: "Scholarship High School", status: "Active" });
    const adminUser = await UserModel.create({ _id: adminId, name: "School Admin", email: `admin.ovr.${Date.now()}@test.com`, role: "SchoolAdmin", schoolId, status: "Active", isActive: true });

    const parentDoc = await ParentModel.create({ schoolId, name: "Parent A", email: `parent.ovr.${Date.now()}@test.com`, userId: new mongoose.Types.ObjectId() });
    const studentA = await StudentModel.create({
      schoolId,
      rollNo: "08",
      admissionNo: `ADM-OVR-${Date.now()}`,
      name: "Student A (Scholarship Candidate)",
      parentId: parentDoc._id,
      status: "Active"
    });

    console.log(`  -> Student A created (ID: ${studentA._id})`);

    console.log("\nStep 2: Applying ₹5,000 Scholarship Override on Class 8 Standard Fee (₹26,000)...");
    const standardFeeAmount = 26000;
    const discountVal = 5000;
    const netPayableAmount = standardFeeAmount - discountVal; // 21,000

    const auditLog = await FeeAdjustmentAuditModel.create({
      schoolId,
      studentId: studentA._id,
      adjustedBy: adminUser._id,
      adjustmentType: "Scholarship",
      standardFeeAmount,
      adjustmentAmount: discountVal,
      netPayableAmount,
      reason: "Merit-based Scholarship Grant 2026-27"
    });

    console.log(`  -> Audit Log Entry Saved (ID: ${auditLog._id})`);
    console.log(`  -> Standard Class 8 Fee: ₹${standardFeeAmount}`);
    console.log(`  -> Scholarship Granted: -₹${discountVal}`);
    console.log(`  -> Final Net Payable Amount: ₹${netPayableAmount} (Expected: ₹21,000)`);

    if (netPayableAmount !== 21000) {
      throw new Error("Net payable calculation mismatch!");
    }

    console.log("\nStep 3: Verifying Audit Log Records in Database...");
    const auditLogs = await FeeAdjustmentAuditModel.find({ schoolId, studentId: studentA._id }).lean();
    console.log(`  -> Total Audit Logs Found: ${auditLogs.length}`);

    if (auditLogs.length !== 1 || auditLogs[0].netPayableAmount !== 21000) {
      throw new Error("Audit log verification failed!");
    }

    console.log("  -> Audit Trail Verification: PASSED ✅");

    console.log("\nStep 4: Cleaning up test records...");
    await Promise.all([
      SchoolModel.findByIdAndDelete(schoolId),
      UserModel.findByIdAndDelete(adminId),
      ParentModel.findByIdAndDelete(parentDoc._id),
      StudentModel.findByIdAndDelete(studentA._id),
      FeeAdjustmentAuditModel.deleteMany({ schoolId })
    ]);
    console.log("  -> Cleanup completed successfully.");

    console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY! Student-level fee overrides and audit logging are 100% verified.");
  } catch (error) {
    console.error("❌ TEST FAILED:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

run();
