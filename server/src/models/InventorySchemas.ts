import { Schema, model } from "mongoose";

// ──────────── 1. FIXED ASSETS ────────────
const assetSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  name: { type: String, required: true, trim: true },
  serialNo: { type: String, trim: true },
  category: { type: String, trim: true },
  location: { type: String, trim: true },
  quantity: { type: Number, default: 1 },
  unitCost: { type: Number, default: 0 },
  condition: { 
    type: String, 
    enum: ["Excellent", "Good", "Requires Service", "Damaged"],
    default: "Good" 
  },
  status: { type: String, default: "In Use" }
}, { timestamps: true });

export const AssetModel = model("assets", assetSchema);

// ──────────── 2. STATIONERY & CONSUMABLES ────────────
const stationerySchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  name: { type: String, required: true, trim: true },
  category: { type: String, trim: true },
  inStock: { type: Number, default: 0 },
  minAlert: { type: Number, default: 10 },
  unitCost: { type: Number, default: 0 },
  status: { type: String, default: "In Stock" }
}, { timestamps: true });

export const StationeryModel = model("stationery", stationerySchema);

// ──────────── 3. VENDOR DIRECTORY ────────────
const vendorSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  name: { type: String, required: true, trim: true },
  gstin: { type: String, trim: true },
  category: { type: String, trim: true },
  phone: { type: String, trim: true },
  rating: { type: String, default: "5.0 ★" }
}, { timestamps: true });

export const VendorModel = model("vendors", vendorSchema);

// ──────────── 4. VENDOR PURCHASE ORDERS ────────────
const purchaseOrderSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  poCode: { type: String, required: true, unique: true },
  vendor: { type: String, required: true },
  item: { type: String, required: true },
  cost: { type: Number, required: true },
  date: { type: String, required: true },
  status: { type: String, default: "ISSUED ⏳" }
}, { timestamps: true });

export const PurchaseOrderModel = model("purchaseOrders", purchaseOrderSchema);
