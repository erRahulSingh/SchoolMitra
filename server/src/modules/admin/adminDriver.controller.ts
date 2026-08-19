// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Admin Driver Master Controller (Phase 11.2)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { DriverModel, BusModel } from "../../models/TransportSchemas";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { Types } from "mongoose";

const dummySchoolId = new Types.ObjectId("650000000000000000000001");

// Helper to seed drivers if empty
const getOrSeedDrivers = async () => {
  const drivers = await DriverModel.find().lean().catch(() => []);
  if (drivers.length > 0) return drivers;

  return await DriverModel.create([
    { schoolId: dummySchoolId, name: "Ram Singh", empId: "EMP-DRV-101", phone: "+91 98111 22334", licenseNo: "DL-14201100987", status: "Active", licenseExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 5) },
    { schoolId: dummySchoolId, name: "Vikram Jeet", empId: "EMP-DRV-102", phone: "+91 98222 33445", licenseNo: "DL-14201100543", status: "Active", licenseExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 5) }
  ]);
};

// ════════════ 1. GET ALL DRIVERS ════════════
export const getDrivers = asyncHandler(async (req: Request, res: Response) => {
  await getOrSeedDrivers();
  const drivers = await DriverModel.find()
    .populate("assignedBusId")
    .lean();

  return ApiResponse.success(res, 200, "Drivers list retrieved successfully", { drivers });
});

// ════════════ 2. CREATE DRIVER ════════════
export const createDriver = asyncHandler(async (req: Request, res: Response) => {
  const { name, empId, phone, alternatePhone, licenseNo, licenseExpiry, photo, address, experienceYears, assignedBusId, status } = req.body;

  if (!name || !phone || !licenseNo || !licenseExpiry) {
    throw ApiError.badRequest("Name, phone, license number, and license expiry are required.");
  }

  // Create driver
  const created = await DriverModel.create({
    schoolId: dummySchoolId,
    name,
    empId: empId || `DRV-${Date.now().toString().slice(-4)}`,
    phone,
    alternatePhone,
    licenseNo,
    licenseExpiry: new Date(licenseExpiry),
    photo,
    address,
    experienceYears: Number(experienceYears) || 0,
    assignedBusId: assignedBusId && Types.ObjectId.isValid(assignedBusId) ? new Types.ObjectId(assignedBusId) : undefined,
    status: status || "Active"
  });

  // If assignedBusId is set, update bus mapping
  if (assignedBusId && Types.ObjectId.isValid(assignedBusId)) {
    await BusModel.findByIdAndUpdate(assignedBusId, {
      driverId: created._id,
      driverName: created.name
    });
  }

  return ApiResponse.created(res, "Driver registered successfully in database.", { driver: created });
});

// ════════════ 3. GET DRIVER DETAILS ════════════
export const getDriverById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest("Invalid driver ID.");
  }

  const driver = await DriverModel.findById(id).populate("assignedBusId").lean();
  if (!driver) {
    throw ApiError.notFound("Driver not found.");
  }

  return ApiResponse.success(res, 200, "Driver details retrieved", { driver });
});

// ════════════ 4. UPDATE DRIVER ════════════
export const updateDriver = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, empId, phone, alternatePhone, licenseNo, licenseExpiry, photo, address, experienceYears, assignedBusId, status } = req.body;

  if (!Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest("Invalid driver ID.");
  }

  const updateFields: any = {
    name,
    empId,
    phone,
    alternatePhone,
    licenseNo,
    photo,
    address,
    experienceYears: experienceYears !== undefined ? Number(experienceYears) : undefined,
    assignedBusId: assignedBusId && Types.ObjectId.isValid(assignedBusId) ? new Types.ObjectId(assignedBusId) : undefined,
    status
  };

  if (licenseExpiry) {
    updateFields.licenseExpiry = new Date(licenseExpiry);
  }

  // Remove undefined fields
  Object.keys(updateFields).forEach(key => updateFields[key] === undefined && delete updateFields[key]);

  const updated = await DriverModel.findByIdAndUpdate(id, updateFields, { new: true });
  if (!updated) {
    throw ApiError.notFound("Driver not found.");
  }

  // Handle bus reassignment mapping
  if (assignedBusId && Types.ObjectId.isValid(assignedBusId)) {
    // Unassign driver from other buses if any
    await BusModel.updateMany({ driverId: updated._id }, { $unset: { driverId: 1, driverName: 1 } });
    await BusModel.findByIdAndUpdate(assignedBusId, {
      driverId: updated._id,
      driverName: updated.name
    });
  }

  return ApiResponse.success(res, 200, "Driver record updated successfully", { driver: updated });
});

// ════════════ 5. PATCH DRIVER STATUS ════════════
export const updateDriverStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest("Invalid driver ID.");
  }

  if (!status) {
    throw ApiError.badRequest("Status field is required.");
  }

  const updated = await DriverModel.findByIdAndUpdate(id, { status }, { new: true });
  if (!updated) {
    throw ApiError.notFound("Driver not found.");
  }

  return ApiResponse.success(res, 200, "Driver status updated successfully", { driver: updated });
});
