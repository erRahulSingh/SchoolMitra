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

  // Auto seed if empty
  const count = await SchoolModel.countDocuments().catch(() => 0);
  if (count === 0) {
    await SchoolModel.create([
      { code: "dps-dwr", name: "Delhi Public School (Dwarka)", city: "New Delhi", plan: "Enterprise", status: "Active", maxStudents: 2500 },
      { code: "stx-dwr", name: "St. Xavier's Senior Secondary School", city: "Delhi NCR", plan: "Growth", status: "Active", maxStudents: 1500 },
      { code: "dav-vk", name: "DAV Public School (Vasant Kunj)", city: "New Delhi", plan: "Trial", status: "Trial", maxStudents: 1200 },
      { code: "kv-sec8", name: "Kendriya Vidyalaya Sector 8", city: "Delhi NCR", plan: "Basic", status: "Expired", maxStudents: 800 },
      { code: "ms-bk", name: "Modern School (Barakhamba Road)", city: "New Delhi", plan: "Enterprise", status: "Active", maxStudents: 3000 }
    ]).catch(() => {});
  }

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

  const formatted = schools.map((s: any) => {
    const stCount = s.maxStudents || 1200;
    const prCount = Math.round(stCount * 1.5);
    const drCount = Math.round(stCount / 80);
    return {
      _id: s._id.toString(),
      id: s.code || s._id.toString(),
      name: s.name,
      code: s.code?.toUpperCase() || `CBSE-AFF-${s._id.toString().substring(0, 6)}`,
      city: s.city || "New Delhi",
      plan: s.plan === "Enterprise" ? "Enterprise Pro" : s.plan === "Growth" ? "Growth Plan" : s.plan === "Trial" ? "Trial (14 Days)" : `${s.plan || "Starter"} Plan`,
      adminName: s.adminName || "Principal / Admin",
      email: s.email || `${s.code || "admin"}@schoolmitra.com`,
      phone: s.phone || "+91 98111 00000",
      status: s.status,
      students: stCount,
      studentsCount: stCount,
      parents: prCount,
      parentsCount: prCount,
      drivers: drCount,
      driversCount: drCount,
      mrr: s.plan === "Enterprise" ? "₹ 45,000" : s.plan === "Growth" ? "₹ 32,000" : s.plan === "Trial" ? "₹ 0 (Trial)" : "₹ 18,000",
      expiry: s.expiresAt ? new Date(s.expiresAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "31 Dec 2027"
    };
  });

  return ApiResponse.success(res, 200, "School tenants retrieved successfully", {
    schools: formatted,
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
