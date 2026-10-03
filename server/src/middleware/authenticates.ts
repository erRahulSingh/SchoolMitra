import { verifyToken, requireRoles } from "./authMiddleware";

export const authenticate = verifyToken;

export const requireRole = (...roles: any[]) => {
  return requireRoles(...(roles as any));
};

export default {
  authenticate,
  requireRole,
};
