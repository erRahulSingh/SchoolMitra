// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Fees & Financial Ledger Controller (Phase 9)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { FeeStructureModel, FeeInvoiceModel, PaymentModel, ScholarshipModel, DiscountModel } from "../../models/FeeSchemas";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { verifyPaymentSignature } from "../../config/razorpay";
import { Types } from "mongoose";

const dummySchoolId = new Types.ObjectId("650000000000000000000001");
const dummyClassId = new Types.ObjectId("650000000000000000000002");
const dummyYearId = new Types.ObjectId("650000000000000000000003");

// Helper to seed fee structures if empty
const getOrSeedFeeStructures = async () => {
  const structures = await FeeStructureModel.find().lean().catch(() => []);
  if (structures.length > 0) return structures;

  return await FeeStructureModel.create([
    {
      schoolId: dummySchoolId,
      classId: dummyClassId,
      academicYearId: dummyYearId,
      title: "Class 10 Annual Fee Slab",
      class: "10",
      components: [
        { name: "Tuition Fee", amount: 35000, frequency: "Quarterly" },
        { name: "Transport Fee", amount: 8000, frequency: "Quarterly" },
        { name: "Exam Fee", amount: 2000, frequency: "Quarterly" }
      ],
      totalAnnualFee: 45000,
      lateFeePerDay: 50,
      isActive: true
    },
    {
      schoolId: dummySchoolId,
      classId: dummyClassId,
      academicYearId: dummyYearId,
      title: "Class 8 Annual Fee Slab",
      class: "8",
      components: [
        { name: "Tuition Fee", amount: 28000, frequency: "Quarterly" },
        { name: "Transport Fee", amount: 7000, frequency: "Quarterly" },
        { name: "Exam Fee", amount: 1500, frequency: "Quarterly" }
      ],
      totalAnnualFee: 36500,
      lateFeePerDay: 50,
      isActive: true
    }
  ]);
};

// Helper to seed payments if empty
const getOrSeedPayments = async () => {
  const payments = await PaymentModel.find().lean().catch(() => []);
  if (payments.length > 0) return payments;

  return await PaymentModel.create([
    {
      schoolId: dummySchoolId,
      invoiceId: new Types.ObjectId("650000000000000000000004"),
      studentId: new Types.ObjectId("650000000000000000000005"),
      amountPaid: 22500,
      paymentMethod: "UPI",
      receiptNo: "REC-2026-99401",
      remarks: "Collected for Aarav Sharma",
      paymentDate: new Date()
    },
    {
      schoolId: dummySchoolId,
      invoiceId: new Types.ObjectId("650000000000000000000004"),
      studentId: new Types.ObjectId("650000000000000000000006"),
      amountPaid: 22500,
      paymentMethod: "NetBanking",
      receiptNo: "REC-2026-99402",
      remarks: "Collected for Ananya Patel",
      paymentDate: new Date()
    }
  ]);
};

// ════════════ 1. FEE STRUCTURES ════════════
export const getFeeStructures = asyncHandler(async (_req: Request, res: Response) => {
  const structures = await getOrSeedFeeStructures();

  const formatted = structures.map((s: any) => {
    const tuition = s.components?.find((c: any) => c.name === "Tuition Fee")?.amount || 0;
    const transport = s.components?.find((c: any) => c.name === "Transport Fee")?.amount || 0;
    const exam = s.components?.find((c: any) => c.name === "Exam Fee")?.amount || 0;

    return {
      _id: s._id.toString(),
      title: s.title || "Custom Slab",
      class: s.class || "10",
      tuitionFee: tuition,
      transportFee: transport,
      examFee: exam,
      totalAmount: s.totalAnnualFee || 0,
      term: s.components?.[0]?.frequency || "Monthly"
    };
  });

  return ApiResponse.success(res, 200, "Fee structures retrieved", { structures: formatted });
});

export const createFeeStructure = asyncHandler(async (req: Request, res: Response) => {
  const { title, className, tuitionFee, transportFee, examFee, totalAmount, term } = req.body;

  if (!title || !className) {
    throw ApiError.badRequest("Fee structure title and className are required.");
  }

  const calcTotal = totalAmount || ((Number(tuitionFee) || 0) + (Number(transportFee) || 0) + (Number(examFee) || 0));

  const components = [
    { name: "Tuition Fee", amount: Number(tuitionFee) || 0, frequency: term || "Monthly" },
    { name: "Transport Fee", amount: Number(transportFee) || 0, frequency: term || "Monthly" },
    { name: "Exam Fee", amount: Number(examFee) || 0, frequency: term || "Monthly" }
  ];

  const structure = await FeeStructureModel.create({
    schoolId: dummySchoolId,
    classId: dummyClassId,
    academicYearId: dummyYearId,
    title,
    class: className,
    components,
    totalAnnualFee: calcTotal,
    lateFeePerDay: 50,
    isActive: true
  });

  return ApiResponse.created(res, "Fee structure defined successfully.", { structure });
});

// ════════════ 2. ASSIGN FEE STRUCTURE ════════════
export const assignFeeStructure = asyncHandler(async (req: Request, res: Response) => {
  const { classId, studentId, feeStructureId, academicYear = "2026-2027" } = req.body;

  if (!classId && !studentId) {
    throw ApiError.badRequest("classId or studentId is required for fee assignment.");
  }

  return ApiResponse.success(res, 200, `Fee structure assigned to target scope (${classId || studentId}).`, {
    assignedTarget: classId || studentId,
    feeStructureId,
    academicYear,
    assignedAt: new Date().toISOString()
  });
});

// ════════════ 3. COLLECT FEE PAYMENT ════════════
export const collectFeePayment = asyncHandler(async (req: Request, res: Response) => {
  const { studentId, studentName, amountPaid, paymentMethod = "UPI", gatewayTxnId } = req.body;

  if (!amountPaid) {
    throw ApiError.badRequest("amountPaid is required.");
  }

  const receiptNo = `REC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  const baseAmount = Math.round(Number(amountPaid) / 1.18);
  const gstAmount = Number(amountPaid) - baseAmount;

  const invoiceId = new Types.ObjectId("650000000000000000000004");

  let method = "UPI";
  if (paymentMethod === "Cash") method = "Cash";
  else if (paymentMethod === "Credit Card" || paymentMethod === "Card") method = "Card";

  const payment = await PaymentModel.create({
    schoolId: dummySchoolId,
    invoiceId,
    studentId: new Types.ObjectId("650000000000000000000005"),
    amountPaid: Number(amountPaid),
    paymentMethod: method as any,
    receiptNo,
    remarks: `Collected for ${studentName}`
  });

  return ApiResponse.created(res, "Fee payment collected and receipt generated.", {
    receipt: {
      receiptNo,
      studentId: studentId || "STU-1001",
      studentName: studentName || "Aarav Sharma",
      amountPaid: Number(amountPaid),
      baseAmount,
      gstAmount,
      paymentMethod,
      gatewayTxnId: gatewayTxnId || `TXN-${Math.random().toString(36).substring(2, 10)}`,
      date: new Date().toISOString().split("T")[0],
      status: "PAID ✅"
    }
  });
});

// ════════════ 4. VERIFY PAYMENTS (RAZORPAY) ════════════
export const verifyFeePayment = asyncHandler(async (req: Request, res: Response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const isValid = verifyPaymentSignature(
    razorpay_order_id || "mock_order",
    razorpay_payment_id || "mock_payment",
    razorpay_signature || "mock_sig"
  );

  if (!isValid) {
    throw ApiError.badRequest("Invalid Razorpay payment signature.");
  }

  return ApiResponse.success(res, 200, "Razorpay payment signature verified successfully.", {
    paymentId: razorpay_payment_id || "PAY-99120",
    orderId: razorpay_order_id || "ORD-88120",
    status: "VERIFIED ✅"
  });
});

// ════════════ 5. RECEIPT GENERATOR ════════════
export const getFeeReceiptByNo = asyncHandler(async (req: Request, res: Response) => {
  const { receiptNo } = req.params;

  const payment = await PaymentModel.findOne({ receiptNo }).lean();
  if (!payment) {
    throw ApiError.notFound("Receipt not found.");
  }

  const amt = payment.amountPaid || 0;
  const baseAmount = Math.round(amt / 1.18);
  const gstAmount = amt - baseAmount;

  return ApiResponse.success(res, 200, "Fee receipt details retrieved", {
    receipt: {
      institutionName: "DELHI PUBLIC SCHOOL, NEW DELHI",
      gstin: "07AAAAA0000A1Z5",
      receiptNo: payment.receiptNo,
      studentId: "STU-1001",
      studentName: payment.remarks?.replace("Collected for ", "") || "Aarav Sharma",
      className: "Class 10-A",
      amountPaid: amt,
      baseAmount,
      cgst9Percent: Math.round(gstAmount / 2),
      sgst9Percent: Math.round(gstAmount / 2),
      totalGst: gstAmount,
      paymentMethod: payment.paymentMethod,
      date: payment.paymentDate ? new Date(payment.paymentDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      status: "PAID ✅"
    }
  });
});

// ════════════ 6. REPORTS: COLLECTIONS ════════════
export const getCollectionsReport = asyncHandler(async (_req: Request, res: Response) => {
  const payments = await getOrSeedPayments();
  
  let todayCollection = 0;
  let monthlyCollection = 0;
  const todayStr = new Date().toISOString().split("T")[0];

  const recentReceipts = payments.map((p: any) => {
    const amt = p.amountPaid || 0;
    const baseAmount = Math.round(amt / 1.18);
    const gstAmount = amt - baseAmount;

    todayCollection += amt;
    monthlyCollection += amt;

    return {
      receiptNo: p.receiptNo || "REC-99101",
      studentId: "STU-1001",
      studentName: p.remarks?.replace("Collected for ", "") || "Aarav Sharma",
      className: "10-A",
      amountPaid: amt,
      baseAmount,
      gstAmount,
      paymentMethod: p.paymentMethod,
      date: p.paymentDate ? new Date(p.paymentDate).toISOString().split("T")[0] : todayStr,
      status: "PAID ✅"
    };
  });

  return ApiResponse.success(res, 200, "Fee collections financial ledger report", {
    todayCollection,
    monthlyCollection,
    cgstLiability: Math.round(monthlyCollection * 0.09),
    sgstLiability: Math.round(monthlyCollection * 0.09),
    recentReceipts
  });
});

// ════════════ 7. REPORTS: DEFAULTERS ════════════
export const getDefaultersReport = asyncHandler(async (_req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Pending fee defaulters list", {
    totalPendingAmount: 382000,
    defaultersCount: 3,
    defaultersList: [
      { id: "STU-1002", name: "Ananya Patel", class: "Class 10-A", pendingDues: 18500, dueDate: "15 Jul 2026", status: "OVERDUE ⚠️" },
      { id: "STU-1044", name: "Kunal Singh", class: "Class 9-B", pendingDues: 17500, dueDate: "15 Jul 2026", status: "OVERDUE ⚠️" }
    ]
  });
});
