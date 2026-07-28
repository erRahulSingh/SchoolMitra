import { Schema, model } from "mongoose";

// 9. HR Collections
export const LeaveRequestModel = model("leaveRequests", new Schema({ applicantId: Schema.Types.ObjectId, reason: String, startDate: String, endDate: String, status: String }, { timestamps: true }));
export const SalaryModel = model("salary", new Schema({ staffId: Schema.Types.ObjectId, basicPay: Number, allowances: Number, month: String }, { timestamps: true }));
export const StaffDocumentModel = model("staffDocuments", new Schema({ staffId: Schema.Types.ObjectId, documentName: String, fileUrl: String }, { timestamps: true }));
