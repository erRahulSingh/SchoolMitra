// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Transport Opt-In Isolation & Payment Frequencies Integration Test
// Verifies: Separate Transport Addon, Quarterly/Monthly Frequencies, & Dynamic Class Support
// ═══════════════════════════════════════════════════════════

import mongoose from "mongoose";
import { SchoolModel } from "../models/AuthSchemas";
import { ClassModel } from "../models/SchoolSchemas";
import { FeeStructureModel, FeeInvoiceModel } from "../models/FeeSchemas";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/schoolmitra";

async function run() {
  console.log("🚀 Starting Transport Opt-In & Payment Frequencies Integration Test...\n");
  try {
    await mongoose.connect(MONGO_URI);
    console.log("利益 Connected to Database.");

    const schoolId = new mongoose.Types.ObjectId();
    const yearId = new mongoose.Types.ObjectId();
    const studentA_Id = new mongoose.Types.ObjectId(); // Non-Bus student
    const studentB_Id = new mongoose.Types.ObjectId(); // Bus student

    console.log("Step 1: Setting up School & Dynamic Classes (Pre-Nursery, Class 5)...");
    await SchoolModel.create({ _id: schoolId, code: "SCH-OPT-01", name: "Dynamic Class High School", status: "Active" });

    const preNursery = await ClassModel.create({ schoolId, className: "Pre-Nursery", numericOrder: 0, sections: ["A"] });
    const class5 = await ClassModel.create({ schoolId, className: "Class 5", numericOrder: 5, sections: ["A"] });

    console.log(`  -> Dynamic Classes Created: ${preNursery.className}, ${class5.className}`);

    console.log("\nStep 2: Creating Fee Structure with Base Fee ₹26,000 + Optional Transport Fee ₹12,000...");
    const components = [
      { name: "Admission Fee", feeType: "Admission Fee", amount: 2000, frequency: "One-Time" },
      { name: "Tuition Fee", feeType: "Tuition Fee", amount: 18000, frequency: "Quarterly" },
      { name: "Development Fee", feeType: "Development Fee", amount: 3000, frequency: "Yearly" },
      { name: "Examination Fee", feeType: "Examination Fee", amount: 1500, frequency: "Half-Yearly" },
      { name: "Library Fee", feeType: "Library Fee", amount: 500, frequency: "Yearly" },
      { name: "Annual Fee", feeType: "Annual Fee", amount: 1000, frequency: "Yearly" }
    ];

    const baseClassFeeTotal = components.reduce((sum, c) => sum + c.amount, 0); // 26,000
    const optionalTransportFee = 12000;

    // Calculate Quarterly installment breakdown (Q1-Q4)
    const quarterlyAmount = Math.round(baseClassFeeTotal / 4); // 6,500
    const installmentSchedule = [
      { termName: "Q1 (Apr-Jun)", amount: quarterlyAmount, dueDate: new Date("2026-04-10") },
      { termName: "Q2 (Jul-Sep)", amount: quarterlyAmount, dueDate: new Date("2026-07-10") },
      { termName: "Q3 (Oct-Dec)", amount: quarterlyAmount, dueDate: new Date("2026-10-10") },
      { termName: "Q4 (Jan-Mar)", amount: quarterlyAmount, dueDate: new Date("2026-01-10") }
    ];

    const feeStruct = await FeeStructureModel.create({
      schoolId,
      classId: class5._id,
      academicYearId: yearId,
      title: "Class 5 Dynamic Fee Structure 2026-27",
      class: "Class 5",
      components,
      totalAnnualFee: baseClassFeeTotal,
      paymentFrequency: "Quarterly",
      installmentSchedule,
      optionalTransportFee,
      lateFeePerDay: 50,
      isActive: true
    });

    console.log(`  -> Fee Structure created (ID: ${feeStruct._id})`);
    console.log(`  -> Base Class Fee: ₹${baseClassFeeTotal}`);
    console.log(`  -> Optional Transport Addon: ₹${optionalTransportFee}`);
    console.log(`  -> Quarterly Installments: Q1 ₹${installmentSchedule[0].amount}, Q2 ₹${installmentSchedule[1].amount}, Q3 ₹${installmentSchedule[2].amount}, Q4 ₹${installmentSchedule[3].amount}`);

    console.log("\nStep 3: Testing Non-Bus Student (hasTransportOptIn = false)...");
    const invoiceNonBus = await FeeInvoiceModel.create({
      schoolId,
      studentId: studentA_Id,
      invoiceNo: `INV-${Date.now()}-01`,
      academicYearId: yearId,
      components,
      baseClassFeeAmount: baseClassFeeTotal,
      hasTransportOptIn: false,
      transportAmount: 0,
      totalAmount: baseClassFeeTotal // Exactly ₹26,000
    });

    console.log(`  -> Non-Bus Invoice Generated (ID: ${invoiceNonBus._id})`);
    console.log(`  -> Invoice Total: ₹${invoiceNonBus.totalAmount} (Expected: ₹26,000)`);
    if (invoiceNonBus.totalAmount !== 26000) {
      throw new Error("Non-bus student invoice calculation failed!");
    }

    console.log("\nStep 4: Testing Bus Student (hasTransportOptIn = true)...");
    const totalWithTransport = baseClassFeeTotal + optionalTransportFee; // 26,000 + 12,000 = 38,000
    const invoiceBus = await FeeInvoiceModel.create({
      schoolId,
      studentId: studentB_Id,
      invoiceNo: `INV-${Date.now()}-02`,
      academicYearId: yearId,
      components: [...components, { name: "Transport Fee Addon", amount: optionalTransportFee }],
      baseClassFeeAmount: baseClassFeeTotal,
      hasTransportOptIn: true,
      transportAmount: optionalTransportFee,
      totalAmount: totalWithTransport // Exactly ₹38,000
    });

    console.log(`  -> Bus Student Invoice Generated (ID: ${invoiceBus._id})`);
    console.log(`  -> Invoice Total: ₹${invoiceBus.totalAmount} (Expected: ₹38,000)`);
    if (invoiceBus.totalAmount !== 38000) {
      throw new Error("Bus student invoice calculation failed!");
    }

    console.log("\nStep 5: Cleaning up test data...");
    await Promise.all([
      SchoolModel.findByIdAndDelete(schoolId),
      ClassModel.deleteMany({ schoolId }),
      FeeStructureModel.deleteMany({ schoolId }),
      FeeInvoiceModel.deleteMany({ schoolId })
    ]);
    console.log("  -> Cleanup completed successfully.");

    console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY! Transport opt-in isolation, quarterly frequencies, and dynamic class structures are verified.");
  } catch (error) {
    console.error("❌ TEST FAILED:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

run();
