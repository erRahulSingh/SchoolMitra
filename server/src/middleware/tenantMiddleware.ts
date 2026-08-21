import { Response, NextFunction } from "express";
import { Types } from "mongoose";
import { SchoolModel } from "../models/AuthSchemas";
import { AuthenticatedRequest } from "./authMiddleware";
import { evaluateSchoolStatus, SchoolStatus } from "../constants/schoolStatus.constants";
import { ApiError } from "../utils/ApiError";
import logger from "../utils/logger";

export interface TenantContext {
  schoolId: string;
  schoolName: string;
  schoolCode: string;
  plan: string;
  status: string;
}

export interface TenantRequest extends AuthenticatedRequest {
  tenant?: TenantContext;
  school?: any;
}

/**
 * ═══════════════════════════════════════════════════════════
 * requireActiveSchool — Central School Tenant Status Middleware
 * ═══════════════════════════════════════════════════════════
 * 
 * Flow:
 * 1. Identify user from JWT auth
 * 2. SUPER_ADMIN bypasses tenant lock
 * 3. Resolve schoolId
 * 4. Load school from database
 * 5. Check school.status via evaluateSchoolStatus()
 * 6. If ACTIVE or valid TRIAL → continue (req.school / req.tenant attached)
 * 7. If SUSPENDED, EXPIRED, DEACTIVATED, PENDING_APPROVAL → reject immediately with structured JSON
 */
export const requireActiveSchool = async (
  req: TenantRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    // 1. SUPER_ADMIN is globally unscoped and bypasses school-level suspension
    if (user && String(user.role || "").toUpperCase().replace(/[_\s]/g, "") === "SUPERADMIN") {
      return next();
    }

    // 2. Resolve schoolId from JWT, Headers, Query, Params, or Body
    const schoolId =
      user?.schoolId ||
      (req.headers["x-school-id"] as string) ||
      (req.query?.schoolId as string) ||
      (req.params?.schoolId as string) ||
      (req.body?.schoolId as string);

    if (!schoolId) {
      return res.status(403).json({
        success: false,
        error: "NO_SCHOOL_BINDING",
        message: "Access Denied: User is not assigned to a valid school tenant."
      });
    }

    // 3. Load school from DB (by ObjectId or school code)
    const isObjectId = Types.ObjectId.isValid(schoolId);
    let school: any = null;

    if (isObjectId) {
      school = await SchoolModel.findById(schoolId).lean();
    }
    if (!school) {
      school = await SchoolModel.findOne({ code: String(schoolId).toLowerCase() }).lean();
    }

    if (!school) {
      return res.status(404).json({
        success: false,
        error: "TENANT_NOT_FOUND",
        message: "School tenant not found. It may have been deleted or unprovisioned."
      });
    }

    // 4. Central Status Evaluation Engine
    const evaluation = evaluateSchoolStatus(school);

    if (!evaluation.isOperational) {
      logger.warn(`[Tenant Access Blocked] School '${school.name}' (${school.code}) is ${evaluation.effectiveStatus}`);

      return res.status(403).json({
        success: false,
        code: evaluation.code,
        message: evaluation.message,
        schoolStatus: evaluation.effectiveStatus
      });
    }

    // 5. Attach tenant and school context for downstream controllers
    req.school = school;
    req.tenant = {
      schoolId: String(school._id),
      schoolName: school.name,
      schoolCode: school.code,
      plan: school.plan || "Basic",
      status: evaluation.effectiveStatus
    };

    return next();
  } catch (error: any) {
    logger.error(`[requireActiveSchool Error]:`, error?.message || error);
    return res.status(500).json({
      success: false,
      error: "TENANT_EVALUATION_ERROR",
      message: "Internal error verifying school tenant status."
    });
  }
};

/**
 * Alias for backward compatibility
 */
export const verifyTenantStatus = requireActiveSchool;

/**
 * Strict Multi-Tenant Isolation Middleware (schoolId scoping).
 * Prevents Cross-Tenant Data Access (School A vs School B).
 * 
 * Rules:
 * 1. SUPER_ADMIN / SuperAdmin has schoolId = null (unscoped global access, can query any school).
 * 2. All other users (SCHOOL_ADMIN, TEACHER, PARENT, DRIVER) MUST have a valid user.schoolId.
 * 3. If target schoolId is supplied in req.params.schoolId, req.query.schoolId, req.body.schoolId, or req.headers["x-school-id"],
 *    and it DOES NOT match user.schoolId -> Throws ApiError.forbidden("403 Forbidden: Access Denied. Cross-tenant data access blocked by schoolId guard.")
 */
export const enforceTenantIsolation = (
  req: TenantRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw ApiError.unauthorized("Authentication required for tenant isolation check.");
    }

    const normalizedRole = String(user.role || "").toUpperCase();

    // SUPER_ADMIN has global access (schoolId = null)
    if (normalizedRole === "SUPER_ADMIN") {
      return next();
    }

    // School users must have schoolId
    if (!user.schoolId) {
      throw ApiError.forbidden("Access Denied: User is not assigned to a valid schoolId tenant.");
    }

    // Extract target schoolId from URL params, query, body, or header
    const targetSchoolId = 
      req.params.schoolId || 
      req.query.schoolId || 
      req.body.schoolId || 
      req.headers["x-school-id"];

    if (targetSchoolId && String(targetSchoolId) !== String(user.schoolId)) {
      logger.warn(`Cross-tenant breach attempt blocked — User from ${user.schoolId} attempted to access ${targetSchoolId}`, {
        userId: user.id,
        role: user.role,
        userSchoolId: user.schoolId,
        targetSchoolId,
        url: req.originalUrl
      });
      throw ApiError.forbidden("403 Forbidden: Access Denied. Cross-tenant data access blocked by schoolId guard.");
    }

    // Attach tenantScope for query building
    (req as any).tenantScope = { schoolId: String(user.schoolId) };
    return next();
  } catch (error) {
    return next(error);
  }
};
