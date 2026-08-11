// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Admin Teacher Management & Permissions Controller
// Endpoints for School Admin to manage teachers + assign permissions
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  UserModel,
  RoleModel,
  RolePermissionModel,
  UserPermissionOverrideModel,
  AuditLogModel
} from "../../models/AuthSchemas";
import { GLOBAL_PERMISSIONS_REGISTRY, DEFAULT_TEACHER_PERMISSIONS } from "../../constants/permissions.config";

// ════════════ 1. GET /api/v1/admin/teachers — List All Teachers ════════════
export const getAdminTeachers = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const { search, status, page = "1", limit = "50" } = req.query;

  const query: any = {
    role: { $in: ["Teacher", "TEACHER", "teacher"] }
  };

  if (schoolId !== "sch_default") {
    query.schoolId = schoolId;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } }
    ];
  }

  if (status && status !== "all") {
    query.status = status;
  }

  const pageNum = Math.max(1, parseInt(page as string));
  const limitNum = Math.min(100, parseInt(limit as string));
  const skip = (pageNum - 1) * limitNum;

  const [teachers, total] = await Promise.all([
    UserModel.find(query)
      .select("name email phone role status avatar permissions schoolId qualification department subject classTeacher createdAt lastLoginAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    UserModel.countDocuments(query)
  ]);

  return ApiResponse.success(res, 200, "Teachers list retrieved successfully", {
    teachers,
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum)
  });
});

// ════════════ 2. GET /api/v1/admin/teachers/:id — Get Single Teacher ════════════
export const getAdminTeacherById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const teacher = await UserModel.findById(id)
    .select("-password -refreshToken")
    .lean();

  if (!teacher) {
    return ApiResponse.error(res, 404, `Teacher with ID '${id}' not found.`, "NOT_FOUND");
  }

  // Also load permission overrides for this teacher
  const overrides = await UserPermissionOverrideModel.find({ userId: id }).lean();
  const formattedOverrides = overrides.map((o: any) => ({
    permissionKey: o.permissionKey,
    effect: o.effect
  }));

  return ApiResponse.success(res, 200, "Teacher profile retrieved", {
    teacher,
    permissionOverrides: formattedOverrides
  });
});

// ════════════ 3. POST /api/v1/admin/teachers — Create New Teacher ════════════
export const createAdminTeacher = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const {
    name,
    email,
    phone,
    password,
    empId,
    gender,
    dob,
    qualification,
    joiningDate,
    designation,
    department,
    subject,
    classTeacher,
    avatar,
    status
  } = req.body;

  if (!name || !email) {
    return ApiResponse.error(res, 400, "Name and email are required.", "VALIDATION_ERROR");
  }

  // Check if email already exists
  const existing = await UserModel.findOne({ email: email.toLowerCase() });
  if (existing) {
    return ApiResponse.error(res, 409, "A user with this email already exists.", "DUPLICATE_EMAIL");
  }

  const bcrypt = require("bcryptjs");
  const hashedPassword = await bcrypt.hash(password || "Teacher@123", 10);

  const newTeacher = await UserModel.create({
    name,
    email: email.toLowerCase(),
    phone: phone || "",
    password: hashedPassword,
    role: "Teacher",
    schoolId,
    empId: empId || `TCH-${Math.floor(1000 + Math.random() * 9000)}`,
    gender: gender || "",
    dob: dob ? new Date(dob) : undefined,
    qualification: qualification || "",
    joiningDate: joiningDate ? new Date(joiningDate) : new Date(),
    designation: designation || "Teacher",
    department: department || "",
    subject: subject || "",
    classTeacher: classTeacher || "",
    avatar: avatar || "",
    status: status || "ACTIVE",
    isActive: true,
    permissions: {
      attendance: { view: true, create: true, edit: true, delete: false },
      marks: { view: true, create: true, edit: true, delete: false },
      homework: { view: true, create: true, edit: true, delete: true },
      notice: { view: true, create: false, edit: false, delete: false },
      studyMaterial: { view: true, create: true, edit: true, delete: false },
      leave: { view: true, create: true, edit: false, delete: false }
    }
  });

  const teacherObj = newTeacher.toObject();
  delete (teacherObj as any).password;

  return ApiResponse.created(res, "Teacher created successfully", { teacher: teacherObj });
});

// ════════════ 4. PUT /api/v1/admin/teachers/:id — Update Teacher ════════════
export const updateAdminTeacher = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    email,
    phone,
    empId,
    gender,
    dob,
    qualification,
    joiningDate,
    designation,
    department,
    subject,
    classTeacher,
    avatar,
    status
  } = req.body;

  const teacher = await UserModel.findById(id);
  if (!teacher) {
    return ApiResponse.error(res, 404, `Teacher with ID '${id}' not found.`, "NOT_FOUND");
  }

  if (name !== undefined) teacher.name = name;
  if (email !== undefined) teacher.email = email.toLowerCase();
  if (phone !== undefined) teacher.phone = phone;
  if (empId !== undefined) (teacher as any).empId = empId;
  if (gender !== undefined) (teacher as any).gender = gender;
  if (dob !== undefined) (teacher as any).dob = dob ? new Date(dob) : undefined;
  if (qualification !== undefined) (teacher as any).qualification = qualification;
  if (joiningDate !== undefined) (teacher as any).joiningDate = joiningDate ? new Date(joiningDate) : undefined;
  if (designation !== undefined) (teacher as any).designation = designation;
  if (department !== undefined) (teacher as any).department = department;
  if (subject !== undefined) (teacher as any).subject = subject;
  if (classTeacher !== undefined) (teacher as any).classTeacher = classTeacher;
  if (avatar !== undefined) (teacher as any).avatar = avatar;
  if (status !== undefined) teacher.status = status;

  await teacher.save();

  const updated = teacher.toObject();
  delete (updated as any).password;

  return ApiResponse.success(res, 200, "Teacher profile updated successfully", { teacher: updated });
});

// ════════════ 5. PATCH /api/v1/admin/teachers/:id/status — Toggle Status ════════════
export const updateAdminTeacherStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body; // "ACTIVE" | "INACTIVE" | "SUSPENDED"

  if (!status) {
    return ApiResponse.error(res, 400, "Status is required.", "VALIDATION_ERROR");
  }

  const teacher = await UserModel.findById(id);
  if (!teacher) {
    return ApiResponse.error(res, 404, `Teacher with ID '${id}' not found.`, "NOT_FOUND");
  }

  teacher.status = status;
  teacher.isActive = status === "ACTIVE" || status === "Active";
  await teacher.save();

  return ApiResponse.success(res, 200, `Teacher status updated to '${status}'`, {
    teacherId: id,
    status,
    isActive: teacher.isActive
  });
});

// ════════════ 6. GET /api/v1/admin/permissions — All Permission Keys Registry ════════════
export const getAdminPermissions = asyncHandler(async (_req: Request, res: Response) => {
  // Group by module
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

  return ApiResponse.success(res, 200, "Global permissions registry retrieved", {
    modules: Object.values(moduleMap),
    allPermissions: GLOBAL_PERMISSIONS_REGISTRY,
    totalPermissions: GLOBAL_PERMISSIONS_REGISTRY.length,
    defaultTeacherPermissions: DEFAULT_TEACHER_PERMISSIONS
  });
});

// ════════════ 7. GET /api/v1/admin/roles — List All Roles ════════════
export const getAdminRoles = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  // Try DB first
  let roles = await RoleModel.find({
    $or: [{ schoolId }, { schoolId: null }]
  }).lean();

  // Fallback to system defaults
  if (!roles || roles.length === 0) {
    roles = [
      { _id: "role_teacher", roleName: "Teacher", systemRole: "TEACHER", description: "Default Teacher role", permissions: DEFAULT_TEACHER_PERMISSIONS, isSystem: true } as any,
      { _id: "role_admin", roleName: "School Admin", systemRole: "SCHOOL_ADMIN", description: "School Administrator", permissions: GLOBAL_PERMISSIONS_REGISTRY.map(p => p.key), isSystem: true } as any,
      { _id: "role_principal", roleName: "Principal", systemRole: "PRINCIPAL", description: "School Principal", permissions: GLOBAL_PERMISSIONS_REGISTRY.map(p => p.key), isSystem: true } as any
    ];
  }

  return ApiResponse.success(res, 200, "Roles list retrieved", {
    roles,
    total: roles.length
  });
});

// ════════════ 8. GET /api/v1/admin/roles/:id/permissions — Role Permissions ════════════
export const getAdminRolePermissions = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  // Try to find role by ID or by systemRole name
  let role = await RoleModel.findById(id).lean().catch(() => null);
  if (!role) {
    role = await RoleModel.findOne({
      $or: [
        { systemRole: id.toUpperCase() },
        { roleName: { $regex: new RegExp(`^${id}$`, "i") } }
      ],
      $or2: [{ schoolId }, { schoolId: null }]
    }).lean().catch(() => null);
  }

  let permissions: string[] = [];

  if (role) {
    // Check embedded permissions array
    if (Array.isArray((role as any).permissions) && (role as any).permissions.length > 0) {
      permissions = (role as any).permissions;
    } else {
      // Check rolePermissions collection
      const rolePerms = await RolePermissionModel.find({ roleId: (role as any)._id }).lean();
      permissions = rolePerms.map((rp: any) => rp.permissionKey).filter(Boolean);
    }
  }

  // Fallback for TEACHER role
  if (permissions.length === 0) {
    const normalizedId = id.toUpperCase();
    if (normalizedId === "TEACHER" || normalizedId.includes("TEACHER")) {
      permissions = [...DEFAULT_TEACHER_PERMISSIONS];
    }
  }

  return ApiResponse.success(res, 200, "Role permissions retrieved", {
    roleId: id,
    roleName: (role as any)?.roleName || id,
    permissions,
    totalPermissions: permissions.length
  });
});

// ════════════ 9. PUT /api/v1/admin/roles/:id/permissions — Update Role Permissions ════════════
export const updateAdminRolePermissions = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const { permissions: permKeys } = req.body;

  if (!Array.isArray(permKeys)) {
    return ApiResponse.error(res, 400, "Invalid payload: permissions array expected.", "VALIDATION_ERROR");
  }

  // Upsert role
  let role = await RoleModel.findById(id).catch(() => null);
  if (!role) {
    role = await RoleModel.findOne({
      $or: [
        { systemRole: id.toUpperCase() },
        { roleName: { $regex: new RegExp(`^${id}$`, "i") } }
      ]
    }).catch(() => null);
  }

  if (!role) {
    // Create new role entry
    role = await RoleModel.create({
      schoolId,
      roleName: id,
      systemRole: id.toUpperCase(),
      description: `Custom role: ${id}`,
      permissions: permKeys,
      isSystem: false
    });
  } else {
    (role as any).permissions = permKeys;
    await role.save();
  }

  // Sync rolePermissions collection
  await RolePermissionModel.deleteMany({ roleId: role._id });
  if (permKeys.length > 0) {
    const entries = permKeys.map((key: string) => ({
      roleId: role!._id,
      permissionKey: key
    }));
    await RolePermissionModel.insertMany(entries);
  }

  return ApiResponse.success(res, 200, "Role permissions updated successfully", {
    roleId: id,
    updatedCount: permKeys.length,
    permissions: permKeys
  });
});

// ════════════ 10. GET /api/v1/admin/teachers/:id/permissions — Teacher Individual Permissions ════════════
export const getAdminTeacherPermissions = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  const teacher = await UserModel.findById(id).select("name email role permissions").lean();
  if (!teacher) {
    return ApiResponse.error(res, 404, `Teacher with ID '${id}' not found.`, "NOT_FOUND");
  }

  // Load overrides
  const overrides = await UserPermissionOverrideModel.find({ userId: id, schoolId }).lean();
  const overrideMap: Record<string, string> = {};
  overrides.forEach((o: any) => {
    overrideMap[o.permissionKey] = o.effect;
  });

  // Load role default permissions
  const teacherRole = await RoleModel.findOne({ systemRole: "TEACHER", schoolId }).lean().catch(() => null);
  let rolePermissions = [...DEFAULT_TEACHER_PERMISSIONS];
  if (teacherRole && Array.isArray((teacherRole as any).permissions) && (teacherRole as any).permissions.length > 0) {
    rolePermissions = (teacherRole as any).permissions;
  }

  // Build effective permissions matrix
  const effectivePermissions: Record<string, { roleDefault: boolean; override: string; effective: boolean }> = {};

  for (const perm of GLOBAL_PERMISSIONS_REGISTRY) {
    const isRoleDefault = rolePermissions.includes(perm.key);
    const override = overrideMap[perm.key] || "DEFAULT";
    let effective: boolean;

    if (override === "ALLOW") effective = true;
    else if (override === "DENY") effective = false;
    else effective = isRoleDefault;

    effectivePermissions[perm.key] = { roleDefault: isRoleDefault, override, effective };
  }

  return ApiResponse.success(res, 200, "Teacher permissions retrieved with effective resolution", {
    teacherId: id,
    teacherName: (teacher as any).name,
    rolePermissions,
    overrides: overrideMap,
    effectivePermissions,
    modules: GLOBAL_PERMISSIONS_REGISTRY
  });
});

// ════════════ 11. PUT /api/v1/admin/teachers/:id/permissions — Update Teacher Permissions ════════════
export const updateAdminTeacherPermissions = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const { overrides } = req.body; // Array of { permissionKey: string, effect: "ALLOW" | "DENY" | "DEFAULT" }

  if (!Array.isArray(overrides)) {
    return ApiResponse.error(res, 400, "Invalid payload: overrides array expected.", "VALIDATION_ERROR");
  }

  const teacher = await UserModel.findById(id);
  if (!teacher) {
    return ApiResponse.error(res, 404, `Teacher with ID '${id}' not found.`, "NOT_FOUND");
  }

  // 1. Fetch current overrides for audit comparisons
  const oldOverrides = await UserPermissionOverrideModel.find({ userId: id, schoolId }).lean();
  const oldOverrideMap: Record<string, string> = {};
  oldOverrides.forEach((o: any) => {
    oldOverrideMap[o.permissionKey] = o.effect;
  });

  // 2. Clear existing overrides
  await UserPermissionOverrideModel.deleteMany({ userId: id, schoolId });

  // 3. Insert only ALLOW/DENY overrides
  const activeOverrides = overrides.filter((o: any) => o.effect === "ALLOW" || o.effect === "DENY");

  if (activeOverrides.length > 0) {
    const docs = activeOverrides.map((o: any) => ({
      schoolId,
      userId: id,
      permissionKey: o.permissionKey,
      effect: o.effect
    }));
    await UserPermissionOverrideModel.insertMany(docs);
  }

  // 4. Update user's embedded permissions object for fast middleware access
  const permissionsObj: Record<string, Record<string, boolean>> = {};
  for (const o of overrides) {
    const [mod, action] = o.permissionKey.split(".");
    if (!mod || !action) continue;
    if (!permissionsObj[mod]) permissionsObj[mod] = {};
    permissionsObj[mod][action] = o.effect === "ALLOW" || (o.effect === "DEFAULT" && DEFAULT_TEACHER_PERMISSIONS.includes(o.permissionKey));
  }
  teacher.permissions = permissionsObj;
  await teacher.save();

  // 5. Compare and Log Audit Trail
  const auditLogs = [];
  const ipAddressRaw = req.ip || req.headers["x-forwarded-for"] || "";
  const ipAddress = Array.isArray(ipAddressRaw) ? ipAddressRaw[0] : ipAddressRaw;
  const actorId = user?.id || user?._id || new mongoose.Types.ObjectId();
  const actorRole = user?.role || "SchoolAdmin";

  for (const o of overrides) {
    const oldVal = oldOverrideMap[o.permissionKey] || "DEFAULT";
    const newVal = o.effect;
    if (oldVal !== newVal) {
      auditLogs.push({
        schoolId,
        actorId,
        actorRole,
        action: "CHANGED_TEACHER_PERMISSION",
        module: o.permissionKey.split(".")[0] || "permissions",
        targetId: id,
        oldValue: oldVal,
        newValue: newVal,
        ipAddress
      });
    }
  }

  if (auditLogs.length > 0) {
    try {
      await AuditLogModel.insertMany(auditLogs);
    } catch (auditErr) {
      logger.error("Failed to insert permission change audit logs:", auditErr);
    }
  }

  return ApiResponse.success(res, 200, "Teacher permissions updated successfully", {
    teacherId: id,
    savedOverridesCount: activeOverrides.length,
    overrides: activeOverrides,
    loggedAuditEntries: auditLogs.length
  });
});

// ════════════ 12. GET /api/v1/teacher/me — Teacher Self Profile ════════════
export const getTeacherMe = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const userId = user?.id || user?._id;

  if (!userId) {
    return ApiResponse.error(res, 401, "Authentication required.", "UNAUTHORIZED");
  }

  const teacher = await UserModel.findById(userId)
    .select("-password -refreshToken")
    .lean();

  if (!teacher) {
    // Fallback demo for dev
    return ApiResponse.success(res, 200, "Teacher profile retrieved", {
      teacher: {
        _id: userId,
        name: user?.name || "Teacher",
        email: user?.email || "",
        phone: user?.phone || "",
        role: "Teacher",
        schoolId: user?.schoolId || "sch_default",
        status: "ACTIVE"
      }
    });
  }

  return ApiResponse.success(res, 200, "Teacher profile retrieved", { teacher });
});

// ════════════ 13. GET /api/v1/teacher/permissions — Teacher Self Permissions ════════════
export const getTeacherMyPermissions = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const userId = user?.id || user?._id;
  const schoolId = user?.schoolId || "sch_default";
  const normalizedRole = String(user?.role || "").toUpperCase().replace(/[_\s]/g, "");

  // SUPER_ADMIN & SCHOOL_ADMIN have all permissions
  if (normalizedRole === "SUPERADMIN" || normalizedRole === "SCHOOLADMIN" || normalizedRole === "PRINCIPAL") {
    return ApiResponse.success(res, 200, "Full permissions (admin role)", {
      role: user?.role,
      permissions: GLOBAL_PERMISSIONS_REGISTRY.map(p => p.key),
      effectivePermissions: GLOBAL_PERMISSIONS_REGISTRY.reduce((acc, p) => {
        acc[p.key] = true;
        return acc;
      }, {} as Record<string, boolean>)
    });
  }

  // Load role defaults
  const teacherRole = await RoleModel.findOne({ systemRole: "TEACHER", schoolId }).lean().catch(() => null);
  let rolePermissions = [...DEFAULT_TEACHER_PERMISSIONS];
  if (teacherRole && Array.isArray((teacherRole as any).permissions) && (teacherRole as any).permissions.length > 0) {
    rolePermissions = (teacherRole as any).permissions;
  }

  // Load user overrides
  const overrides = await UserPermissionOverrideModel.find({ userId, schoolId }).lean();
  const overrideMap: Record<string, string> = {};
  overrides.forEach((o: any) => {
    overrideMap[o.permissionKey] = o.effect;
  });

  // Compute effective permissions
  const effectivePermissions: Record<string, boolean> = {};
  const grantedPermissions: string[] = [];

  for (const perm of GLOBAL_PERMISSIONS_REGISTRY) {
    const isRoleDefault = rolePermissions.includes(perm.key);
    const override = overrideMap[perm.key];

    let effective: boolean;
    if (override === "ALLOW") effective = true;
    else if (override === "DENY") effective = false;
    else effective = isRoleDefault;

    effectivePermissions[perm.key] = effective;
    if (effective) grantedPermissions.push(perm.key);
  }

  return ApiResponse.success(res, 200, "Your permissions resolved", {
    role: user?.role || "Teacher",
    rolePermissions,
    overrides: overrideMap,
    effectivePermissions,
    grantedPermissions,
    totalGranted: grantedPermissions.length,
    totalAvailable: GLOBAL_PERMISSIONS_REGISTRY.length
  });
});
