// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — School Tenant Controller
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { SchoolModel, UserModel } from "../../models/AuthSchemas";
import { SchoolProfileModel, SchoolSettingsModel } from "../../models/SchoolSchemas";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";

// ════════════ 1. GET ALL SCHOOL TENANTS ════════════
export const getAllSchools = asyncHandler(async (req: Request, res: Response) => {
  const { q, status, plan, page = "1", limit = "20" } = req.query;

  const query: any = {};
  if (status) query.status = status;
  if (plan) query.plan = plan;
  if (q) {
    query.$or = [
      { name: { $regex: q as string, $options: "i" } },
      { code: { $regex: q as string, $options: "i" } },
      { city: { $regex: q as string, $options: "i" } }
    ];
  }

  const pageNum = parseInt(page as string, 10) || 1;
  const limitNum = parseInt(limit as string, 10) || 20;
  const skip = (pageNum - 1) * limitNum;

  const [schools, total] = await Promise.all([
    SchoolModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
    SchoolModel.countDocuments(query)
  ]);

  return ApiResponse.success(res, 200, "School tenants retrieved successfully", {
    schools,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum)
    }
  });
});

// ════════════ 2. PROVISION NEW SCHOOL TENANT ════════════
export const createSchool = asyncHandler(async (req: Request, res: Response) => {
  const { name, code, city, state, address, phone, email, plan = "Basic", maxStudents = 500 } = req.body;

  if (!name) {
    throw ApiError.badRequest("School name is required.");
  }

  const schoolCode = code || name.toLowerCase().replace(/[^a-z0-9]/g, "").substring(0, 8) + Math.floor(100 + Math.random() * 900);

  const existing = await SchoolModel.findOne({ code: schoolCode });
  if (existing) {
    throw ApiError.conflict(`School with code ${schoolCode} already exists.`);
  }

  const school = await SchoolModel.create({
    code: schoolCode,
    name,
    city: city || "Delhi NCR",
    plan,
    status: "Active"
  });

  // Create associated profile & settings
  await Promise.all([
    SchoolProfileModel.create({
      schoolId: school._id,
      legalName: name,
      address: address || city,
      phone: phone || "+91 99999 00000",
      email: email || `${schoolCode}@schoolmitra.com`
    }),
    SchoolSettingsModel.create({
      schoolId: school._id,
      currentAcademicYear: "2026-2027",
      maxStudentsAllowed: maxStudents
    })
  ]);

  return ApiResponse.created(res, "School tenant provisioned successfully.", { school });
});

// ════════════ 3. GET SCHOOL 360° DOSSIER ════════════
export const getSchoolById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const school = await SchoolModel.findById(id).lean();
  if (!school) {
    throw ApiError.notFound("School tenant not found.");
  }

  const [profile, settings, adminUsersCount] = await Promise.all([
    SchoolProfileModel.findOne({ schoolId: id }).lean(),
    SchoolSettingsModel.findOne({ schoolId: id }).lean(),
    UserModel.countDocuments({ schoolId: id })
  ]);

  return ApiResponse.success(res, 200, "School details retrieved", {
    school,
    profile,
    settings,
    stats: {
      adminUsersCount
    }
  });
});

// ════════════ 4. UPDATE SCHOOL PROFILE ════════════
export const updateSchool = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const school = await SchoolModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!school) {
    throw ApiError.notFound("School tenant not found.");
  }

  return ApiResponse.success(res, 200, "School profile updated successfully", { school });
});

// ════════════ 5. TOGGLE SCHOOL STATUS ════════════
export const toggleSchoolStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !["Active", "Suspended", "Trial", "PendingEmailVerification"].includes(status)) {
    throw ApiError.badRequest("Valid status parameter is required (Active, Suspended, Trial, PendingEmailVerification).");
  }

  const school = await SchoolModel.findByIdAndUpdate(id, { status }, { new: true });
  if (!school) {
    throw ApiError.notFound("School tenant not found.");
  }

  return ApiResponse.success(res, 200, `School status updated to ${status}`, { school });
});

// ════════════ 6. GET SCHOOL SETTINGS ════════════
export const getSchoolSettings = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  let settings = await SchoolSettingsModel.findOne({ schoolId: id }).lean();
  if (!settings) {
    settings = await SchoolSettingsModel.create({ schoolId: id });
  }

  return ApiResponse.success(res, 200, "School settings retrieved", { settings });
});

// ════════════ 7. UPDATE SCHOOL SETTINGS ════════════
export const updateSchoolSettings = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const settings = await SchoolSettingsModel.findOneAndUpdate(
    { schoolId: id },
    { $set: req.body },
    { new: true, upsert: true, runValidators: true }
  );

  return ApiResponse.success(res, 200, "School settings updated successfully", { settings });
});

// ════════════ 8. DELETE SCHOOL TENANT ════════════
export const deleteSchool = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const school = await SchoolModel.findByIdAndDelete(id);
  if (!school) {
    throw ApiError.notFound("School tenant not found.");
  }

  return ApiResponse.success(res, 200, "School tenant deleted successfully.");
});
