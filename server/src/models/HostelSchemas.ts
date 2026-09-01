import mongoose, { Schema, Document } from "mongoose";

export interface IHostel extends Document {
  schoolId: mongoose.Types.ObjectId;
  name: string;
  type: "Boys" | "Girls" | "Co-ed";
  address: string;
  intakeCapacity: number;
  wardenId?: mongoose.Types.ObjectId;
  status: "Active" | "Inactive";
  createdAt: Date;
  updatedAt: Date;
}

const HostelSchema = new Schema<IHostel>(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: "School", required: true, index: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["Boys", "Girls", "Co-ed"], required: true },
    address: { type: String },
    intakeCapacity: { type: Number, required: true },
    wardenId: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

export const Hostel = mongoose.model<IHostel>("Hostel", HostelSchema);

export interface IHostelRoom extends Document {
  schoolId: mongoose.Types.ObjectId;
  hostelId: mongoose.Types.ObjectId;
  roomNumber: string;
  roomType: "AC" | "Non-AC";
  bedCapacity: number;
  occupiedBeds: number;
  costPerMonth: number;
}

const HostelRoomSchema = new Schema<IHostelRoom>(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: "School", required: true },
    hostelId: { type: Schema.Types.ObjectId, ref: "Hostel", required: true, index: true },
    roomNumber: { type: String, required: true },
    roomType: { type: String, enum: ["AC", "Non-AC"], default: "Non-AC" },
    bedCapacity: { type: Number, required: true },
    occupiedBeds: { type: Number, default: 0 },
    costPerMonth: { type: Number, required: true },
  },
  { timestamps: true }
);

export const HostelRoom = mongoose.model<IHostelRoom>("HostelRoom", HostelRoomSchema);

export interface IHostelAllocation extends Document {
  schoolId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  hostelId: mongoose.Types.ObjectId;
  roomId: mongoose.Types.ObjectId;
  joinDate: Date;
  leaveDate?: Date;
  status: "Active" | "Vacated";
}

const HostelAllocationSchema = new Schema<IHostelAllocation>(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: "School", required: true },
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true, index: true },
    hostelId: { type: Schema.Types.ObjectId, ref: "Hostel", required: true },
    roomId: { type: Schema.Types.ObjectId, ref: "HostelRoom", required: true },
    joinDate: { type: Date, required: true, default: Date.now },
    leaveDate: { type: Date },
    status: { type: String, enum: ["Active", "Vacated"], default: "Active" },
  },
  { timestamps: true }
);

export const HostelAllocation = mongoose.model<IHostelAllocation>("HostelAllocation", HostelAllocationSchema);

export interface IGatePass extends Document {
  schoolId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  reason: string;
  outTime: Date;
  expectedInTime: Date;
  actualInTime?: Date;
  approvedBy?: mongoose.Types.ObjectId;
  status: "Pending" | "Approved" | "Rejected" | "Returned";
}

const GatePassSchema = new Schema<IGatePass>(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: "School", required: true },
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true, index: true },
    reason: { type: String, required: true },
    outTime: { type: Date, required: true },
    expectedInTime: { type: Date, required: true },
    actualInTime: { type: Date },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["Pending", "Approved", "Rejected", "Returned"], default: "Pending" },
  },
  { timestamps: true }
);

export const GatePass = mongoose.model<IGatePass>("GatePass", GatePassSchema);
