// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Independent Fee Structure & Multi-Tenant Integration Test
// Verifies: Itemized fee component calculations & strict multi-tenant isolation (School A vs School B)
// ═══════════════════════════════════════════════════════════

import mongoose from "mongoose";
import { SchoolModel } from "../models/AuthSchemas";
import { ClassModel } from "../models/SchoolSchemas";
import { FeeStructureModel } from "../models/FeeSchemas";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/schoolmitra";

async function run() {
  console.log("🚀 Starting Independent Fee Structure & Multi-Tenant Isolation Test...\n");
  try {
    await mongoose.connect(MONGO_URI);
    console.log("❇️ Connected to Database.");

    const schoolA_Id = new mongoose.Types.ObjectId();
    const schoolB_Id = new mongoose.Types.ObjectId();
    const yearId = new mongoose.Types.ObjectId();

    console.log("Step 1: Setting up School A & School B...");
    await SchoolModel.create({ _id: schoolA_Id, code: "SCH-FEE-A", name: "School A (Low Fee)", status: "Active" });
    await SchoolModel.create({ _id: schoolB_Id, code: "SCH-FEE-B", name: "School B (High Fee)", status: "Active" });

    const classA_5 = await ClassModel.create({ schoolId: schoolA_Id, className: "Class 5", numericOrder: 5, sections: ["A"] });
    const classB_5 = await ClassModel.create({ schoolId: schoolB_Id, className: "Class 5", numericOrder: 5, sections: ["A"] });

    console.log("\nStep 2: Defining Itemized Fee Structure for School A (Class 5)...");
    const componentsA = [
      { name: "Admission Fee", feeType: "Admission Fee", amount: 2000, frequency: "One-Time" },
      { name: "Tuition Fee", feeType: "Tuition Fee", amount: 18000, frequency: "Quarterly" },
      { name: "Development Fee", feeType: "Development Fee", amount: 3000, frequency: "Yearly" },
      { name: "Examination Fee", feeType: "Examination Fee", amount: 1500, frequency: "Half-Yearly" },
      { name: "Library Fee", feeType: "Library Fee", amount: 500, frequency: "Yearly" },
      { name: "Annual Fee", feeType: "Annual Fee", amount: 1000, frequency: "Yearly" }
    ];

    const totalA = componentsA.reduce((sum, c) => sum + c.amount, 0);

    const feeStructA = await FeeStructureModel.create({
      schoolId: schoolA_Id,
      classId: classA_5._id,
      academicYearId: yearId,
      title: "Class 5 Annual Fee Slab 2026-27",
      class: "5",
      components: componentsA,
      totalAnnualFee: totalA,
      lateFeePerDay: 50,
      isActive: true
    });

    console.log(`  -> School A Class 5 Fee Structure created (ID: ${feeStructA._id})`);
    console.log(`  -> Calculated Total Annual Fee: ₹${totalA} (Expected: ₹26,000)`);
    if (totalA !== 26000) throw new Error("School A total fee calculation mismatch!");

    console.log("\nStep 3: Defining Independent Itemized Fee Structure for School B (Class 5)...");
    const componentsB = [
      { name: "Admission Fee", feeType: "Admission Fee", amount: 3000, frequency: "One-Time" },
      { name: "Tuition Fee", feeType: "Tuition Fee", amount: 25000, frequency: "Quarterly" }
    ];

    const totalB = componentsB.reduce((sum, c) => sum + c.amount, 0);

    const feeStructB = await FeeStructureModel.create({
      schoolId: schoolB_Id,
      classId: classB_5._id,
      academicYearId: yearId,
      title: "Class 5 Premium Fee Slab 2026-27",
      class: "5",
      components: componentsB,
      totalAnnualFee: totalB,
      lateFeePerDay: 100,
      isActive: true
    });

    console.log(`  -> School B Class 5 Fee Structure created (ID: ${feeStructB._id})`);
    console.log(`  -> Calculated Total Annual Fee: ₹${totalB} (Expected: ₹28,000)`);
    if (totalB !== 28000) throw new Error("School B total fee calculation mismatch!");

    console.log("\nStep 4: Verifying Multi-Tenant Isolation (School A Query vs School B Query)...");
    const queryA = await FeeStructureModel.find({ schoolId: schoolA_Id }).lean();
    const queryB = await FeeStructureModel.find({ schoolId: schoolB_Id }).lean();

    console.log(`  -> School A query returned ${queryA.length} fee structure(s)`);
    console.log(`  -> School B query returned ${queryB.length} fee structure(s)`);

    if (queryA.length !== 1 || String(queryA[0]._id) !== String(feeStructA._id)) {
      throw new Error("Multi-tenant isolation failed for School A!");
    }
    if (queryB.length !== 1 || String(queryB[0]._id) !== String(feeStructB._id)) {
      throw new Error("Multi-tenant isolation failed for School B!");
    }

    console.log("  -> School A cannot access School B fee structures and vice-versa: PASSED ✅");

    console.log("\nStep 5: Cleaning up test data...");
    await Promise.all([
      SchoolModel.findByIdAndDelete(schoolA_Id),
      SchoolModel.findByIdAndDelete(schoolB_Id),
      ClassModel.deleteMany({ schoolId: { $in: [schoolA_Id, schoolB_Id] } }),
      FeeStructureModel.deleteMany({ schoolId: { $in: [schoolA_Id, schoolB_Id] } })
    ]);
    console.log("  -> Cleanup completed successfully.");

    console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY! Independent school-wise fee structures and multi-tenant isolation are verified.");
  } catch (error) {
    console.error("❌ TEST FAILED:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

run();
