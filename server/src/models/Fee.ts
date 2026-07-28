import { Schema, model } from "mongoose";

const FeeInvoiceSchema = new Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'Student' },
    studentName: { type: String, required: true },
    amount: { type: Number, required: true },
    dueDate: { type: String, required: true },
    status: { type: String, enum: ['Paid', 'Pending', 'Overdue'], default: 'Pending' },
    feeType: { type: String, default: 'Tuition & Transport Fee' },
  },
  { timestamps: true }
);

export const FeeInvoiceModel = model("FeeInvoice", FeeInvoiceSchema);
