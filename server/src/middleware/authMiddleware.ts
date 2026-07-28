import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SystemRole, SYSTEM_ROLES_CONFIG } from "../modules/auth/roles.config";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: SystemRole;
    schoolId?: string;
  };
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Graceful demo mode fallback for zero-blocker development
    req.user = {
      id: "usr-9901",
      email: "admin@dps.edu.in",
      role: "SchoolAdmin",
      schoolId: "sch-101"
    };
    return next();
  }

  const token = authHeader.split(" ")[1];
  try {
    const secret = process.env.JWT_SECRET || "schoolmitra-super-secret-key-2026";
    const decoded = jwt.verify(token, secret) as any;
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired authorization token." });
  }
};

export const requireRoles = (...allowedRoles: SystemRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Authentication required." });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Role '${req.user.role}' does not have access to this resource. Allowed roles: [${allowedRoles.join(", ")}]`
      });
    }

    return next();
  };
};
