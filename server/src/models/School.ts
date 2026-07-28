import { Schema, model } from "mongoose";

const SchoolSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    plan: { type: String, enum: ['Starter', 'Pro', 'Enterprise'], default: 'Pro' },
    status: { type: String, enum: ['Active', 'Suspended', 'Pending'], default: 'Active' },
    studentsCount: { type: Number, default: 0 },
    busesCount: { type: Number, default: 0 },
    mrr: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const SchoolModel = model("School", SchoolSchema);
