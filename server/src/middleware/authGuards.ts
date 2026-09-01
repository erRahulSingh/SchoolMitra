import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse";
import { UserPermissionOverrideModel, RolePermissionModel, RoleModel, SchoolModel } from "../models/AuthSchemas";
import { evaluateSchoolStatus } from "../constants/schoolStatus.constants";
import { DEFAULT_TEACHER_PERMISSIONS } from "../constants/permissions.config";

// ──────────── TYPES ────────────
export interface AuthUser {
  id: string;
  _id?: string;
  email: string;
  role: string;
  schoolId?: string;
  name?: string;
  phone?: string;
  permissions?: any;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
  school?: any;
}

// ════════════ 1. authenticate() — JWT Token Verification & Live Status Check ════════════
export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // DEV BYPASS for local prototyping without token
      req.user = {
        id: "mock_user_123",
        _id: "mock_user_123",
        email: "demo@schoolmitra.com",
        role: "SUPERADMIN",
        schoolId: "650000000000000000000001",
        name: "Demo Admin",
      };
      return next();
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return ApiResponse.error(res, 401, "Authorization token is malformed.", "UNAUTHORIZED");
    }

    const secret = process.env.JWT_SECRET || "schoolmitra_dev_secret_2026";
    const decoded = jwt.verify(token, secret) as AuthUser;

    req.user = {
      id: decoded.id || (decoded as any)._id,
      _id: decoded.id || (decoded as any)._id,
      email: decoded.email,
      role: decoded.role,
      schoolId: decoded.schoolId,
      name: decoded.name || decoded.email,
      permissions: decoded.permissions
    };

    const normalizedRole = String(decoded.role || "").toUpperCase().replace(/[_\s]/g, "");

    // SUPER_ADMIN has global access — bypasses school-level suspension
    if (normalizedRole === "SUPERADMIN") {
      return next();
    }

    // Step 8: LIVE SCHOOL STATUS VALIDATION FOR EXISTING JWT SESSIONS
    const targetSchoolId = decoded.schoolId || (req.headers["x-school-id"] as string);
    if (targetSchoolId) {
      const isObjectId = mongoose.Types.ObjectId.isValid(targetSchoolId);
      let school: any = null;
      if (isObjectId) {
        school = await SchoolModel.findById(targetSchoolId).lean();
      }
      if (!school) {
        school = await SchoolModel.findOne({ code: String(targetSchoolId).toLowerCase() }).lean();
      }

      if (school) {
        const evaluation = evaluateSchoolStatus(school);
        if (!evaluation.isOperational) {
          return res.status(403).json({
            success: false,
            code: evaluation.code,
            message: evaluation.message,
            schoolStatus: evaluation.effectiveStatus
          });
        }

        // Step 9: Token sessionVersion validation check
        const tokenSessionVersion = (decoded as any).sessionVersion;
        if (
          typeof tokenSessionVersion === "number" &&
          typeof school.sessionVersion === "number" &&
          tokenSessionVersion < school.sessionVersion
        ) {
          return res.status(403).json({
            success: false,
            code: SchoolErrorCode.SCHOOL_ACCESS_REVOKED,
            message: "Your session has been invalidated due to a school status change. Please login again.",
            schoolStatus: evaluation.effectiveStatus
          });
        }

        req.school = school;
      }
    }

    return next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return ApiResponse.error(res, 401, "Token expired. Please login again.", "TOKEN_EXPIRED");
    }
    if (error.name === "JsonWebTokenError") {
      return ApiResponse.error(res, 401, "Invalid authentication token.", "INVALID_TOKEN");
    }
    return ApiResponse.error(res, 401, "Authentication failed.", "AUTH_FAILED");
  }
};

// ════════════ 2. requireSchool() / requireActiveSchool() — Multi-Tenant School Validation ════════════
export { requireActiveSchool } from "./tenantMiddleware";

export const requireSchool = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  return requireActiveSchool(req as any, res, next);
};

// ════════════ 3. requireRole() — Role-Based Access Control ════════════
// Checks if user's role is in the allowed list.
// Role comparison is case-insensitive & underscore-tolerant.
export const requireRole = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return ApiResponse.error(res, 401, "Authentication required.", "UNAUTHORIZED");
    }

    const normalizedUserRole = String(user.role || "").toUpperCase().replace(/[_\s]/g, "");
    const normalizedAllowed = allowedRoles.map(r => r.toUpperCase().replace(/[_\s]/g, ""));

    if (!normalizedAllowed.includes(normalizedUserRole)) {
      return ApiResponse.error(
        res, 403,
        `Access denied: Role '${user.role}' is not permitted. Required: [${allowedRoles.join(", ")}]`,
        "ROLE_DENIED"
      );
    }

    return next();
  };
};

// ════════════ 4. requirePermission() — Granular Permission Guard ════════════
// 2-Layer Resolution: User Override → Role Default → System Default
// 1. Checks userPermissionOverrides for explicit ALLOW/DENY
// 2. Falls back to role permissions (DB) or system defaults
// SUPER_ADMIN & SCHOOL_ADMIN bypass all permission checks within their tenant.
export const requirePermission = (permissionKey: string) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        return ApiResponse.error(res, 401, "Authentication required.", "UNAUTHORIZED");
      }

      const normalizedRole = String(user.role || "").toUpperCase().replace(/[_\s]/g, "");

      const SUPER_ADMIN_PERMISSIONS = [
        "schools.view",
        "schools.create",
        "schools.update",
        "schools.suspend",
        "subscriptions.view",
        "subscriptions.manage",
        "system.settings",
        "audit.logs"
      ];

      const isSuperAdminPermission = SUPER_ADMIN_PERMISSIONS.includes(permissionKey);

      // 1. SUPER_ADMIN Scope
      if (normalizedRole === "SUPERADMIN") {
        if (isSuperAdminPermission) {
          return next(); // Granted global management access
        }
        return ApiResponse.error(
          res, 403,
          "Permission Denied: Super Admin cannot perform school-level institution operations.",
          "SUPER_ADMIN_BLOCKED"
        );
      }

      // Deny access to global Super Admin permissions for all non-SuperAdmin users
      if (isSuperAdminPermission) {
        return ApiResponse.error(
          res, 403,
          "Permission Denied: Only Super Admin can access global institution management.",
          "SUPER_ADMIN_ONLY"
        );
      }

      // 2. SCHOOL_ADMIN Scope
      if (normalizedRole === "SCHOOLADMIN" || normalizedRole === "PRINCIPAL") {
        return next(); // School Admin and Principal bypass granular permission checks for all school-level operations
      }

      const userId = user.id || user._id;
      const schoolId = user.schoolId || req.headers["x-school-id"] as string || "sch_default";

      // LAYER 1: Check userPermissionOverrides (explicit ALLOW/DENY)
      if (userId && schoolId) {
        try {
          const override = await UserPermissionOverrideModel.findOne({
            schoolId,
            userId,
            permissionKey
          }).lean();

          if (override) {
            if ((override as any).effect === "DENY") {
              return ApiResponse.error(
                res, 403,
                `You do not have permission to ${permissionKey.replace(".", " ")}`,
                "PERMISSION_DENIED"
              );
            }
            if ((override as any).effect === "ALLOW") {
              return next(); // Explicitly granted
            }
          }
        } catch (dbErr) {
          // DB unavailable — continue to fallback layers
        }
      }

      // LAYER 2: Check user's embedded permissions object (from JWT or DB)
      if (user.permissions) {
        // Array format: ["attendance.view", "marks.create"]
        if (Array.isArray(user.permissions) && user.permissions.includes(permissionKey)) {
          return next();
        }
        // Object format: { attendance: { view: true, create: true } }
        if (typeof user.permissions === "object" && !Array.isArray(user.permissions)) {
          const [mod, act] = permissionKey.split(".");
          if (mod && act && user.permissions[mod]) {
            const modulePerms = user.permissions[mod];
            if (typeof modulePerms === "object") {
              const mappedAct = act === "update" ? (modulePerms.update ?? modulePerms.edit) : modulePerms[act];
              if (mappedAct === true) return next();
              if (mappedAct === false) {
                return ApiResponse.error(
                  res, 403,
                  `You do not have permission to ${permissionKey.replace(".", " ")}`,
                  "PERMISSION_DENIED"
                );
              }
            }
          }
          // Direct key check
          if (user.permissions[permissionKey] === true) return next();
          if (user.permissions[permissionKey] === false) {
            return ApiResponse.error(
              res, 403,
              `You do not have permission to ${permissionKey.replace(".", " ")}`,
              "PERMISSION_DENIED"
            );
          }
        }
      }

      // LAYER 3: Check Role Default Permissions (DB rolePermissions collection)
      try {
        const teacherRole = await RoleModel.findOne({
          systemRole: normalizedRole === "TEACHER" ? "TEACHER" : normalizedRole,
          schoolId
        }).lean();

        if (teacherRole) {
          // Check embedded permissions array first
          if (Array.isArray((teacherRole as any).permissions) && (teacherRole as any).permissions.includes(permissionKey)) {
            return next();
          }
          // Check rolePermissions collection
          const rolePerm = await RolePermissionModel.findOne({
            roleId: (teacherRole as any)._id,
            permissionKey
          }).lean();

          if (rolePerm) return next();
        }
      } catch (dbErr) {
        // DB unavailable — continue to system default fallback
      }

      // LAYER 4: System Default Permissions for TEACHER role
      if (normalizedRole === "TEACHER" && DEFAULT_TEACHER_PERMISSIONS.includes(permissionKey)) {
        return next();
      }

      // DENIED — No layer granted the permission
      return ApiResponse.error(
        res, 403,
        `You do not have permission to ${permissionKey.replace(".", " ")}`,
        "PERMISSION_DENIED"
      );

    } catch (error) {
      return next(error);
    }
  };
};

// ════════════ CONVENIENCE COMBOS ════════════

// Full pipeline for Teacher-only endpoints requiring a specific permission
export const teacherGuard = (permissionKey: string) => [
  authenticate,
  requireSchool,
  requireRole("Teacher", "SchoolAdmin", "SuperAdmin", "Principal"),
  requirePermission(permissionKey)
];

// Admin-only guard (SchoolAdmin + SuperAdmin)
export const adminGuard = () => [
  authenticate,
  requireSchool,
  requireRole("SchoolAdmin", "SuperAdmin", "Principal")
];

// Super Admin only
export const superAdminGuard = () => [
  authenticate,
  requireRole("SuperAdmin")
];
