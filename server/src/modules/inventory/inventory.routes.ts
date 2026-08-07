import { Router } from "express";
import {
  getAssetsList,
  addAsset,
  deleteAsset,
  getStationeryList,
  addStationeryItem,
  deleteStationeryItem,
  getVendorsList,
  addVendor,
  deleteVendor,
  getPurchaseOrdersList,
  addPurchaseOrder,
  deletePurchaseOrder
} from "./inventory.controller";

const router = Router();

// Assets routes
router.get("/assets", getAssetsList);
router.post("/assets", addAsset);
router.delete("/assets/:id", deleteAsset);

// Stationery routes
router.get("/stationery", getStationeryList);
router.post("/stationery", addStationeryItem);
router.delete("/stationery/:id", deleteStationeryItem);

// Vendors routes
router.get("/vendors", getVendorsList);
router.post("/vendors", addVendor);
router.delete("/vendors/:id", deleteVendor);

// Purchase Orders routes
router.get("/purchase_orders", getPurchaseOrdersList);
router.post("/purchase_orders", addPurchaseOrder);
router.delete("/purchase_orders/:id", deletePurchaseOrder);

export default router;
