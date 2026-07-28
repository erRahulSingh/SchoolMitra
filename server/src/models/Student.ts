import { Schema, model } from "mongoose";

const StudentSchema = new Schema(
  {
    rollNo: { type: String, required: true },
    name: { type: String, required: true },
    class: { type: String, required: true },
    section: { type: String, required: true },
    parentName: { type: String, required: true },
    parentPhone: { type: String, required: true },
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    busAllocated: { type: Boolean, default: false },
    busRoute: { type: String },
    attendanceRate: { type: String, default: "95%" },
    feeStatus: { type: String, enum: ['Paid', 'Pending', 'Overdue'], default: 'Paid' },
  },
  { timestamps: true }
);

export const StudentModel = model("Student", StudentSchema);
