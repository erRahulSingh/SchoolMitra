import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SystemRole, SYSTEM_ROLES_CONFIG } from "./roles.config";

export const loginUserRole = async (req: Request, res: Response) => {
  const { email, password, role } = req.body as { email: string; password?: string; role?: SystemRole };

  const userRole: SystemRole = role || 'SchoolAdmin';
  const roleConfig = SYSTEM_ROLES_CONFIG[userRole] || SYSTEM_ROLES_CONFIG['SchoolAdmin'];

  const secret = process.env.JWT_SECRET || "schoolmitra-super-secret-key-2026";
  const payload = {
    id: `usr-${Date.now()}`,
    email: email || `user@schoolmitra.com`,
    role: userRole,
    schoolId: "sch-101"
  };

  const token = jwt.sign(payload, secret, { expiresIn: '7d' });

  return res.json({
    success: true,
    message: `Authentication successful for role '${userRole}'`,
    token,
    user: {
      ...payload,
      portal: roleConfig.portal,
      allowedModulesCount: roleConfig.allowedModules.length
    }
  });
};

export const getRolesConfig = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    totalRoles: Object.keys(SYSTEM_ROLES_CONFIG).length,
    roles: SYSTEM_ROLES_CONFIG
  });
};
