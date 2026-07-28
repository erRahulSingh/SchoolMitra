// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Multi-Tenant Resolution Middleware
// ═══════════════════════════════════════════════════════════

import { Response, NextFunction } from "express";
import { SchoolModel } from "../models/AuthSchemas";
import { AuthenticatedRequest } from "./authMiddleware";
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
}

/**
 * Resolves the tenant (school) from the authenticated user's schoolId.
 * Checks subscription status, trial expiry, and suspension.
 * Must be mounted AFTER verifyToken middleware.
 */
export const verifyTenantStatus = async (
  req: TenantRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || !req.user.schoolId) {
      throw ApiError.unauthorized("Authentication required to resolve tenant workspace.");
    }

    const school = await SchoolModel.findById(req.user.schoolId);
    if (!school) {
      throw ApiError.notFound("Tenant workspace not found. School may have been deleted.");
    }

    const now = new Date();

    // 1. Suspension Check
    if (school.status === "Suspended") {
      logger.warn(`Tenant access blocked — school suspended`, {
        schoolId: school._id,
        schoolName: school.name,
      });
      throw ApiError.forbidden(
        "This workspace has been suspended by SchoolMitra. Please contact support."
      );
    }

    // 2. Trial Period Expiry Check
    if (school.status === "Trial") {
      const trialEnd = school.trialEndsAt ? new Date(school.trialEndsAt as Date) : null;
      if (trialEnd && trialEnd < now) {
        school.status = "Expired";
        await school.save();
        logger.info(`Trial expired — school moved to Expired`, {
          schoolId: school._id,
          schoolName: school.name,
        });
        throw ApiError.paymentRequired(
          "Your trial period has expired. Please upgrade your subscription to restore access."
        );
      }
    }

    // 3. Subscription Expiry Check
    if (school.status === "Active") {
      const expiryDate = school.expiresAt ? new Date(school.expiresAt as Date) : null;
      if (expiryDate && expiryDate < now) {
        school.status = "Expired";
        await school.save();
        logger.info(`Subscription expired — school moved to Expired`, {
          schoolId: school._id,
          schoolName: school.name,
        });
        throw ApiError.paymentRequired(
          "Your subscription has expired. Please renew to restore workspace access."
        );
      }
    }

    // 4. Already Expired
    if (school.status === "Expired") {
      throw ApiError.paymentRequired(
        "Your subscription is expired. Please renew to continue using SchoolMitra."
      );
    }

    // 5. Pending Verification
    if (school.status === "PendingEmailVerification") {
      throw ApiError.forbidden(
        "Email verification is pending. Please verify your email to activate your account."
      );
    }

    // ──── Attach tenant context ────
    req.tenant = {
      schoolId: String(school._id),
      schoolName: school.name as string,
      schoolCode: school.code as string,
      plan: (school.plan as string) || "Basic",
      status: school.status as string,
    };

    return next();
  } catch (error) {
    return next(error);
  }
};
