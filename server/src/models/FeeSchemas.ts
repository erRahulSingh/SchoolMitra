import { Schema, model } from "mongoose";

// 5. Fees Collections
export const FeeStructureModel = model("feeStructures", new Schema({ class: String, tuitionFee: Number, busFee: Number }, { timestamps: true }));
export const FeeInvoiceModel = model("feeInvoices", new Schema({ studentId: Schema.Types.ObjectId, amount: Number, dueDate: String, status: String }, { timestamps: true }));
export const PaymentModel = model("payments", new Schema({ invoiceId: Schema.Types.ObjectId, amountPaid: Number, paymentMethod: String }, { timestamps: true }));
export const TransactionModel = model("transactions", new Schema({ gatewayTxnId: String, status: String, amount: Number }, { timestamps: true }));
export const DiscountModel = model("discounts", new Schema({ discountName: String, percentage: Number }, { timestamps: true }));
export const ScholarshipModel = model("scholarships", new Schema({ studentId: Schema.Types.ObjectId, amountGranted: Number }, { timestamps: true }));
