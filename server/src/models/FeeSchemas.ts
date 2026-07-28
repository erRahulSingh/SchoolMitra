// ═══════════════════════════════════════════════════════════
// SchoolMitra — Module 5: Fees & Payments Collections (6)
// ═══════════════════════════════════════════════════════════

import { Schema, model } from "mongoose";

// ──────────── 25. FEE STRUCTURES ────────────
const feeStructureSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: "classes",
    required: true,
    index: true,
  },
  academicYearId: {
    type: Schema.Types.ObjectId,
    ref: "academicYears",
    required: true,
  },
  components: [{
    name: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    frequency: {
      type: String,
      enum: ["Monthly", "Quarterly", "Half-Yearly", "Yearly", "One-Time"],
      default: "Monthly",
    },
  }],
  totalAnnualFee: { type: Number, required: true },
  lateFeePerDay: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

feeStructureSchema.index({ schoolId: 1, classId: 1, academicYearId: 1 }, { unique: true });
export const FeeStructureModel = model("feeStructures", feeStructureSchema);

// ──────────── 26. FEE INVOICES ────────────
const feeInvoiceSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "students",
    required: true,
    index: true,
  },
  invoiceNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  academicYearId: {
    type: Schema.Types.ObjectId,
    ref: "academicYears",
  },
  components: [{
    name: { type: String },
    amount: { type: Number },
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  discountAmount: { type: Number, default: 0 },
  lateFee: { type: Number, default: 0 },
  netAmount: { type: Number, required: true },
  paidAmount: { type: Number, default: 0 },
  balanceAmount: { type: Number, default: 0 },
  dueDate: {
    type: Date,
    required: true,
  },
  month: { type: String, trim: true },
  status: {
    type: String,
    enum: ["Unpaid", "Partial", "Paid", "Overdue", "Cancelled", "Refunded"],
    default: "Unpaid",
    index: true,
  },
  generatedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
}, { timestamps: true });

feeInvoiceSchema.index({ schoolId: 1, studentId: 1, status: 1 });
feeInvoiceSchema.index({ schoolId: 1, dueDate: -1 });
export const FeeInvoiceModel = model("feeInvoices", feeInvoiceSchema);

// ──────────── 27. PAYMENTS ────────────
const paymentSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  invoiceId: {
    type: Schema.Types.ObjectId,
    ref: "feeInvoices",
    required: true,
    index: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "students",
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "UPI", "BankTransfer", "Cheque", "Card", "Online", "Razorpay"],
    required: true,
  },
  transactionId: {
    type: Schema.Types.ObjectId,
    ref: "transactions",
  },
  receiptNo: { type: String, trim: true },
  paymentDate: { type: Date, default: Date.now },
  receivedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  remarks: { type: String, trim: true },
}, { timestamps: true });

paymentSchema.index({ schoolId: 1, invoiceId: 1 });
paymentSchema.index({ schoolId: 1, paymentDate: -1 });
export const PaymentModel = model("payments", paymentSchema);

// ──────────── 28. TRANSACTIONS (Gateway Records) ────────────
const transactionSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    index: true,
  },
  gatewayTxnId: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  orderId: { type: String, trim: true },
  gateway: {
    type: String,
    enum: ["Razorpay", "PayU", "Cashfree", "Stripe", "Manual"],
    default: "Razorpay",
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: { type: String, default: "INR" },
  status: {
    type: String,
    enum: ["Initiated", "Pending", "Success", "Failed", "Refunded"],
    default: "Initiated",
    index: true,
  },
  payerEmail: { type: String, trim: true },
  payerPhone: { type: String, trim: true },
  gatewayResponse: { type: Schema.Types.Mixed },
  refundId: { type: String, trim: true },
  refundAmount: { type: Number },
}, { timestamps: true });

transactionSchema.index({ schoolId: 1, status: 1 });
export const TransactionModel = model("transactions", transactionSchema);

// ──────────── 29. DISCOUNTS ────────────
const discountSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: [true, "Discount name is required"],
    trim: true,
  },
  type: {
    type: String,
    enum: ["Percentage", "FixedAmount"],
    default: "Percentage",
  },
  value: {
    type: Number,
    required: true,
    min: 0,
  },
  applicableClasses: [{
    type: Schema.Types.ObjectId,
    ref: "classes",
  }],
  applicableComponents: [{ type: String }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const DiscountModel = model("discounts", discountSchema);

// ──────────── 30. SCHOLARSHIPS ────────────
const scholarshipSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "students",
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: [true, "Scholarship name is required"],
    trim: true,
  },
  amountGranted: {
    type: Number,
    required: true,
    min: 0,
  },
  academicYearId: {
    type: Schema.Types.ObjectId,
    ref: "academicYears",
  },
  criteria: { type: String, trim: true },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Disbursed"],
    default: "Pending",
  },
}, { timestamps: true });

scholarshipSchema.index({ schoolId: 1, studentId: 1 });
export const ScholarshipModel = model("scholarships", scholarshipSchema);
