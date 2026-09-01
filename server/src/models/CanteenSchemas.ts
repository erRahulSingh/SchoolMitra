import mongoose, { Schema, Document } from "mongoose";

export interface IStudentWallet extends Document {
  schoolId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  balance: number;
  dailyLimit: number;
  rfidTag?: string; // Optional linked physical RFID card
  status: "Active" | "Frozen";
  createdAt: Date;
  updatedAt: Date;
}

const StudentWalletSchema = new Schema<IStudentWallet>(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: "School", required: true, index: true },
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true, unique: true },
    balance: { type: Number, default: 0, min: 0 },
    dailyLimit: { type: Number, default: 500 }, // Max 500 Rs per day default
    rfidTag: { type: String, unique: true, sparse: true },
    status: { type: String, enum: ["Active", "Frozen"], default: "Active" },
  },
  { timestamps: true }
);

export const StudentWallet = mongoose.model<IStudentWallet>("StudentWallet", StudentWalletSchema);


export interface IWalletTransaction extends Document {
  schoolId: mongoose.Types.ObjectId;
  walletId: mongoose.Types.ObjectId;
  amount: number;
  type: "Credit" | "Debit";
  description: string;
  referenceId?: string; // e.g. Razorpay Payment ID or Order ID
  createdAt: Date;
}

const WalletTransactionSchema = new Schema<IWalletTransaction>(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: "School", required: true },
    walletId: { type: Schema.Types.ObjectId, ref: "StudentWallet", required: true, index: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["Credit", "Debit"], required: true },
    description: { type: String, required: true },
    referenceId: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const WalletTransaction = mongoose.model<IWalletTransaction>("WalletTransaction", WalletTransactionSchema);


export interface ICanteenItem extends Document {
  schoolId: mongoose.Types.ObjectId;
  name: string;
  category: "Snacks" | "Meals" | "Beverages" | "Stationery";
  price: number;
  isAvailable: boolean;
  stockCount: number;
}

const CanteenItemSchema = new Schema<ICanteenItem>(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: "School", required: true, index: true },
    name: { type: String, required: true },
    category: { type: String, enum: ["Snacks", "Meals", "Beverages", "Stationery"], required: true },
    price: { type: Number, required: true, min: 0 },
    isAvailable: { type: Boolean, default: true },
    stockCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CanteenItem = mongoose.model<ICanteenItem>("CanteenItem", CanteenItemSchema);


export interface ICanteenOrder extends Document {
  schoolId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  items: Array<{ itemId: mongoose.Types.ObjectId; quantity: number; price: number }>;
  totalAmount: number;
  status: "Completed" | "Cancelled";
  servedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const CanteenOrderSchema = new Schema<ICanteenOrder>(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: "School", required: true },
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true, index: true },
    items: [
      {
        itemId: { type: Schema.Types.ObjectId, ref: "CanteenItem", required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
      }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["Completed", "Cancelled"], default: "Completed" },
    servedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const CanteenOrder = mongoose.model<ICanteenOrder>("CanteenOrder", CanteenOrderSchema);
