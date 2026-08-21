// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Authentication Middleware (Production)
// ═══════════════════════════════════════════════════════════

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { SystemRole } from "../modules/auth/roles.config";
import { SchoolModel } from "../models/AuthSchemas";
import { evaluateSchoolStatus } from "../constants/schoolStatus.constants";
import { ApiError } from "../utils/ApiError";

export interface JwtPayload {
  id: string;
  email: string;
  role: SystemRole;
  schoolId?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
  school?: any;
}

/**
 * Verifies Bearer JWT token and dynamically validates LIVE school account status from DB.
 * Even if JWT is valid for 7 days, if school was suspended 1 minute ago, the request is immediately rejected.
 */
export const verifyToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      error: "UNAUTHORIZED",
      message: "Authorization token is required. Provide a Bearer token in the Authorization header."
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "UNAUTHORIZED",
      message: "Authorization token is malformed."
    });
  }

  try {
    const secret = process.env.JWT_SECRET || "schoolmitra-super-secret-jwt-key-2026";
    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.user = decoded;

    const normalizedRole = String(decoded.role || "").toUpperCase().replace(/[_\s]/g, "");

    // SUPER_ADMIN has global scope and bypasses school-level suspension
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
            code: "SESSION_INVALIDATED",
            message: "Your session has been invalidated due to a school status change. Please login again.",
            schoolStatus: evaluation.effectiveStatus
          });
        }

        req.school = school;
      }
    }

    return next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        error: "TOKEN_EXPIRED",
        message: "Your session token has expired or is invalid. Please log in again."
      });
    }
    return next(error);
  }
};

/**
 * Role-Based Access Control (RBAC) guard.
 * Checks if the authenticated user's role is in the allowed list.
 */
export const requireRoles = (...allowedRoles: SystemRole[]) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw ApiError.unauthorized("Authentication required.");
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw ApiError.forbidden(
        `Access denied: Role '${req.user.role}' is not permitted. Required: [${allowedRoles.join(", ")}]`
      );
    }

    return next();
  };
};
