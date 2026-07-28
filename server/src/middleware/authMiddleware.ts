// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Authentication Middleware (Production)
// ═══════════════════════════════════════════════════════════

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SystemRole } from "../modules/auth/roles.config";
import { ApiError } from "../utils/ApiError";

export interface JwtPayload {
  id: string;
  email: string;
  role: SystemRole;
  schoolId?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

/**
 * Verifies Bearer JWT token from Authorization header.
 * Throws ApiError.unauthorized() if missing or invalid — NO demo bypass.
 */
export const verifyToken = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw ApiError.unauthorized("Authorization token is required. Provide a Bearer token in the Authorization header.");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw ApiError.unauthorized("Authorization token is malformed.");
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw ApiError.internal("JWT_SECRET is not configured in environment variables.");
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.user = decoded;
    return next();
  } catch (error: any) {
    // Let JWT-specific errors propagate to global error handler
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      return next(error);
    }
    // Re-throw ApiError as-is
    if (error instanceof ApiError) {
      return next(error);
    }
    return next(ApiError.unauthorized("Invalid or expired authorization token."));
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
