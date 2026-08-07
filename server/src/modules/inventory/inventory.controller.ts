import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { AssetModel, StationeryModel, VendorModel, PurchaseOrderModel } from "../../models/InventorySchemas";
import { Types } from "mongoose";

const dummySchoolId = new Types.ObjectId("507f1f77bcf86cd799439011");

// Helper to seed assets if empty
const getOrSeedAssets = async () => {
  const assets = await AssetModel.find().lean();
  if (assets.length > 0) return assets;

  return await AssetModel.create([
    { schoolId: dummySchoolId, name: "Dell OptiPlex Desktop Computers", serialNo: "DL-OPT-99120", category: "Computer Lab Asset", location: "Lab #2 (2nd Floor)", quantity: 45, unitCost: 42000, condition: "Excellent", status: "In Use" },
    { schoolId: dummySchoolId, name: "BenQ 4K Smart Interactive Displays", serialNo: "BQ-DISP-4412", category: "Classroom Technology", location: "Class 10-A Room", quantity: 12, unitCost: 115000, condition: "Good", status: "In Use" },
    { schoolId: dummySchoolId, name: "Olympus Binocular Science Microscopes", serialNo: "OLY-MIC-3312", category: "Biology Lab", location: "Biology Lab", quantity: 25, unitCost: 18500, condition: "Requires Service", status: "Maintenance" }
  ]);
};

// Helper to seed stationery if empty
const getOrSeedStationery = async () => {
  const stationery = await StationeryModel.find().lean();
  if (stationery.length > 0) return stationery;

  return await StationeryModel.create([
    { schoolId: dummySchoolId, name: "CBSE Official Answer Booklet (32 Pages)", category: "Exam Materials", inStock: 1200, minAlert: 500, unitCost: 18, status: "In Stock" },
    { schoolId: dummySchoolId, name: "Dry Erase Whiteboard Markers (Black)", category: "Classroom Supplies", inStock: 45, minAlert: 100, unitCost: 35, status: "LOW STOCK ALERT ⚠️" },
    { schoolId: dummySchoolId, name: "NCERT Mathematics Class 10 Textbooks", category: "Library Stock", inStock: 180, minAlert: 50, unitCost: 160, status: "In Stock" }
  ]);
};

// Helper to seed vendors if empty
const getOrSeedVendors = async () => {
  const vendors = await VendorModel.find().lean();
  if (vendors.length > 0) return vendors;

  return await VendorModel.create([
    { schoolId: dummySchoolId, name: "Hindustan Office Supplies Ltd", gstin: "07AAAAA0000A1Z5", category: "Stationery & Exam Sheets", phone: "+91 98111 88776", rating: "4.9 ★" },
    { schoolId: dummySchoolId, name: "TechnoVision IT Systems", gstin: "07BBBBB1111B1Z2", category: "Computers & Smart Boards", phone: "+91 98222 99887", rating: "4.8 ★" }
  ]);
};

// Helper to seed purchase orders if empty
const getOrSeedPurchaseOrders = async () => {
  const pos = await PurchaseOrderModel.find().lean();
  if (pos.length > 0) return pos;

  return await PurchaseOrderModel.create([
    { schoolId: dummySchoolId, poCode: "PO-9001", vendor: "Hindustan Office Supplies Ltd", item: "500 Dry Erase Markers & 2000 Answer Booklets", cost: 53500, date: "26 July 2026", status: "RECEIVED & PAID ✅" },
    { schoolId: dummySchoolId, poCode: "PO-9002", vendor: "TechnoVision IT Systems", item: "2 New Smart Interactive Displays", cost: 230000, date: "29 July 2026", status: "ISSUED ⏳" }
  ]);
};

// ════════════ 1. ASSETS TRACKING (CRUD) ════════════
export const getAssetsList = asyncHandler(async (_req: Request, res: Response) => {
  const assets = await getOrSeedAssets();
  return ApiResponse.success(res, 200, "Assets catalog list", { assets });
});

export const addAsset = asyncHandler(async (req: Request, res: Response) => {
  const { id, name, category, location, quantity, unitCost, condition } = req.body;

  if (id && Types.ObjectId.isValid(id)) {
    // UPDATE
    const asset = await AssetModel.findByIdAndUpdate(
      id,
      {
        name,
        category: category || "Computer Lab Asset",
        location: location || "Main Store",
        quantity: Number(quantity) || 1,
        unitCost: Number(unitCost) || 0,
        condition: condition || "Good"
      },
      { new: true }
    );
    return ApiResponse.success(res, 200, "Asset updated successfully", { asset });
  } else {
    // CREATE
    const asset = await AssetModel.create({
      schoolId: dummySchoolId,
      name,
      serialNo: `SN-${Math.floor(100000 + Math.random() * 900000)}`,
      category: category || "Computer Lab Asset",
      location: location || "Main Store",
      quantity: Number(quantity) || 1,
      unitCost: Number(unitCost) || 0,
      condition: condition || "Good",
      status: "In Use"
    });
    return ApiResponse.success(res, 201, "Fixed asset registered", { asset });
  }
});

export const deleteAsset = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (Types.ObjectId.isValid(id)) {
    await AssetModel.findByIdAndDelete(id);
  }
  return ApiResponse.success(res, 200, "Asset removed from inventory catalog");
});

// ════════════ 2. STATIONERY (CRUD) ════════════
export const getStationeryList = asyncHandler(async (_req: Request, res: Response) => {
  const stationery = await getOrSeedStationery();
  return ApiResponse.success(res, 200, "Stationery consumables list", { stationery });
});

export const addStationeryItem = asyncHandler(async (req: Request, res: Response) => {
  const { id, name, category, inStock, minAlert, unitCost } = req.body;
  const stock = Number(inStock) || 0;
  const alertVal = Number(minAlert) || 10;

  if (id && Types.ObjectId.isValid(id)) {
    // UPDATE
    const item = await StationeryModel.findByIdAndUpdate(
      id,
      {
        name,
        category: category || "General",
        inStock: stock,
        minAlert: alertVal,
        unitCost: Number(unitCost) || 0,
        status: stock <= alertVal ? "LOW STOCK ALERT ⚠️" : "In Stock"
      },
      { new: true }
    );
    return ApiResponse.success(res, 200, "Stationery stock updated", { item });
  } else {
    // CREATE
    const item = await StationeryModel.create({
      schoolId: dummySchoolId,
      name,
      category: category || "General",
      inStock: stock,
      minAlert: alertVal,
      unitCost: Number(unitCost) || 0,
      status: stock <= alertVal ? "LOW STOCK ALERT ⚠️" : "In Stock"
    });
    return ApiResponse.success(res, 201, "Stationery item added to stock", { item });
  }
});

export const deleteStationeryItem = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (Types.ObjectId.isValid(id)) {
    await StationeryModel.findByIdAndDelete(id);
  }
  return ApiResponse.success(res, 200, "Stationery item deleted successfully");
});

// ════════════ 3. VENDORS (CRUD) ════════════
export const getVendorsList = asyncHandler(async (_req: Request, res: Response) => {
  const vendors = await getOrSeedVendors();
  return ApiResponse.success(res, 200, "Approved vendor directory", { vendors });
});

export const addVendor = asyncHandler(async (req: Request, res: Response) => {
  const { id, name, gstin, category, phone } = req.body;

  if (id && Types.ObjectId.isValid(id)) {
    // UPDATE
    const vendor = await VendorModel.findByIdAndUpdate(
      id,
      {
        name,
        gstin: gstin || "07MOCKGSTIN",
        category: category || "General Services",
        phone: phone || "+91 99999 88888"
      },
      { new: true }
    );
    return ApiResponse.success(res, 200, "Vendor directory updated", { vendor });
  } else {
    // CREATE
    const vendor = await VendorModel.create({
      schoolId: dummySchoolId,
      name,
      gstin: gstin || "07MOCKGSTIN",
      category: category || "General Services",
      phone: phone || "+91 99999 88888",
      rating: "5.0 ★"
    });
    return ApiResponse.success(res, 201, "Vendor added successfully", { vendor });
  }
});

export const deleteVendor = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (Types.ObjectId.isValid(id)) {
    await VendorModel.findByIdAndDelete(id);
  }
  return ApiResponse.success(res, 200, "Vendor deleted from directory");
});

// ════════════ 4. PURCHASE ORDERS (CRUD) ════════════
export const getPurchaseOrdersList = asyncHandler(async (_req: Request, res: Response) => {
  const purchaseOrders = await getOrSeedPurchaseOrders();
  return ApiResponse.success(res, 200, "Purchase orders checklist", { purchaseOrders });
});

export const addPurchaseOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id, vendor, item, cost, status } = req.body;

  if (id && Types.ObjectId.isValid(id)) {
    // UPDATE
    const po = await PurchaseOrderModel.findByIdAndUpdate(
      id,
      {
        vendor,
        item,
        cost: Number(cost) || 10000,
        status: status || "ISSUED ⏳"
      },
      { new: true }
    );
    return ApiResponse.success(res, 200, "Purchase order updated", { purchaseOrder: po });
  } else {
    // CREATE
    const po = await PurchaseOrderModel.create({
      schoolId: dummySchoolId,
      poCode: `PO-${Math.floor(9000 + Math.random() * 999)}`,
      vendor,
      item,
      cost: Number(cost) || 10000,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
      status: "ISSUED ⏳"
    });
    return ApiResponse.success(res, 201, "Purchase order issued to vendor", { purchaseOrder: po });
  }
});

export const deletePurchaseOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (Types.ObjectId.isValid(id)) {
    await PurchaseOrderModel.findByIdAndDelete(id);
  }
  return ApiResponse.success(res, 200, "Purchase order deleted successfully");
});
