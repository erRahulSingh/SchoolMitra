import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { GLOBAL_PERMISSIONS_REGISTRY, DEFAULT_TEACHER_PERMISSIONS } from "../../constants/permissions.config";
import { RoleModel, RolePermissionModel, UserPermissionOverrideModel, UserModel } from "../../models/AuthSchemas";

// ════════════ 1. GET GLOBAL PERMISSIONS REGISTRY ════════════
// Returns the complete permission modules matrix for the admin UI
export const getPermissionsRegistry = asyncHandler(async (_req: Request, res: Response) => {
  // Group permissions by module for admin UI consumption
  const moduleMap: Record<string, { module: string; actions: { key: string; action: string; description: string }[] }> = {};

  for (const p of GLOBAL_PERMISSIONS_REGISTRY) {
    if (!moduleMap[p.module]) {
      moduleMap[p.module] = { module: p.module, actions: [] };
    }
    moduleMap[p.module].actions.push({
      key: p.key,
      action: p.action,
      description: p.description
    });
  }

  return ApiResponse.success(res, 200, "Permissions registry retrieved", {
    modules: Object.values(moduleMap),
    allPermissionKeys: GLOBAL_PERMISSIONS_REGISTRY.map(p => p.key)
  });
});

// ════════════ 2. GET TEACHER ROLE DEFAULT PERMISSIONS ════════════
export const getTeacherRolePermissions = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = (req as any).user?.schoolId || "sch_default";

  // Try to load from DB first
  const teacherRole = await RoleModel.findOne({ systemRole: "TEACHER", schoolId }).lean();
  let assignedKeys: string[] = [];

  if (teacherRole) {
    const rolePerms = await RolePermissionModel.find({ roleId: teacherRole._id }).lean();
    assignedKeys = rolePerms.map((rp: any) => rp.permissionKey).filter(Boolean);
  }

  // Fallback: if nothing is stored in DB yet, use the hardcoded defaults
  if (assignedKeys.length === 0) {
    assignedKeys = [...DEFAULT_TEACHER_PERMISSIONS];
  }

  return ApiResponse.success(res, 200, "Teacher role default permissions retrieved", {
    role: "TEACHER",
    schoolId,
    permissions: assignedKeys
  });
});

// ════════════ 3. UPDATE TEACHER ROLE DEFAULT PERMISSIONS ════════════
export const updateTeacherRolePermissions = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const { permissions: permKeys } = req.body; // Array of string keys

  if (!Array.isArray(permKeys)) {
    return ApiResponse.error(res, 400, "Invalid payload: permissions array expected");
  }

  // Upsert the Teacher role for this school
  let teacherRole = await RoleModel.findOne({ systemRole: "TEACHER", schoolId });
  if (!teacherRole) {
    teacherRole = await RoleModel.create({
      schoolId,
      roleName: "Teacher",
      systemRole: "TEACHER",
      description: "Default Teacher role",
      permissions: permKeys,
      isSystem: true
    });
  } else {
    teacherRole.permissions = permKeys;
    await teacherRole.save();
  }

  // Sync rolePermissions collection as well
  await RolePermissionModel.deleteMany({ roleId: teacherRole._id });

  if (permKeys.length > 0) {
    const entries = permKeys.map((key: string) => ({
      roleId: teacherRole._id,
      permissionKey: key
    }));
    await RolePermissionModel.insertMany(entries);
  }

  return ApiResponse.success(res, 200, "Teacher role permissions updated successfully", {
    role: "TEACHER",
    schoolId,
    updatedCount: permKeys.length,
    permissions: permKeys
  });
});

// ════════════ 4. GET INDIVIDUAL TEACHER PERMISSION OVERRIDES ════════════
export const getUserPermissionOverrides = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";

  const user = await UserModel.findById(userId).lean().catch(() => null);
  const overrides = await UserPermissionOverrideModel.find({ userId, schoolId }).lean();

  const formattedOverrides = overrides.map((o: any) => ({
    permissionKey: o.permissionKey,
    effect: o.effect
  }));

  return ApiResponse.success(res, 200, "User permission overrides retrieved", {
    userId,
    userName: (user as any)?.name || "Unknown Teacher",
    schoolId,
    overrides: formattedOverrides
  });
});

// ════════════ 5. UPDATE INDIVIDUAL TEACHER PERMISSION OVERRIDES ════════════
export const updateUserPermissionOverrides = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const { overrides } = req.body; // Array of { permissionKey: string, effect: "ALLOW" | "DENY" | "DEFAULT" }

  if (!Array.isArray(overrides)) {
    return ApiResponse.error(res, 400, "Invalid payload: overrides array expected");
  }

  // Clear existing overrides for this user+school
  await UserPermissionOverrideModel.deleteMany({ userId, schoolId });

  // Only save ALLOW/DENY overrides (DEFAULT means inherit from role, so no override needed)
  const activeOverrides = overrides.filter((o: any) => o.effect === "ALLOW" || o.effect === "DENY");

  if (activeOverrides.length > 0) {
    const docs = activeOverrides.map((o: any) => ({
      schoolId,
      userId,
      permissionKey: o.permissionKey,
      effect: o.effect
    }));
    await UserPermissionOverrideModel.insertMany(docs);
  }

  // Also update the user's embedded permissions object for quick middleware access
  const permissionsObj: Record<string, Record<string, boolean>> = {};
  for (const o of overrides) {
    const [mod, action] = o.permissionKey.split(".");
    if (!permissionsObj[mod]) permissionsObj[mod] = {};
    permissionsObj[mod][action] = o.effect === "ALLOW";
  }

  await UserModel.findByIdAndUpdate(userId, { permissions: permissionsObj }).catch(() => {});

  return ApiResponse.success(res, 200, "Teacher permission overrides saved successfully", {
    userId,
    savedCount: activeOverrides.length,
    overrides: activeOverrides
  });
});

// ════════════ 6. GET ALL TEACHERS LIST (For permission management) ════════════
export const getTeachersForPermissions = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = (req as any).user?.schoolId || "sch_default";

  const teachers = await UserModel.find({
    role: { $in: ["TEACHER", "Teacher", "teacher"] },
    ...(schoolId !== "sch_default" ? { schoolId } : {})
  }).select("name email phone role status avatar permissions").lean();

  return ApiResponse.success(res, 200, "Teachers list retrieved for permission management", {
    teachers,
    total: teachers.length
  });
});
