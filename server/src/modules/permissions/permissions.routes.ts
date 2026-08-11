import { Router } from "express";
import {
  getPermissionsRegistry,
  getTeacherRolePermissions,
  updateTeacherRolePermissions,
  getUserPermissionOverrides,
  updateUserPermissionOverrides,
  getTeachersForPermissions
} from "./permissions.controller";

const router = Router();

// GET /api/v1/permissions/registry — Full permissions modules matrix
router.get("/registry", getPermissionsRegistry);

// GET /api/v1/permissions/teacher-role — Teacher role default permissions
router.get("/teacher-role", getTeacherRolePermissions);

// PUT /api/v1/permissions/teacher-role — Update Teacher role default permissions matrix
router.put("/teacher-role", updateTeacherRolePermissions);

// GET /api/v1/permissions/teachers — List all teachers for permission management
router.get("/teachers", getTeachersForPermissions);

// GET /api/v1/permissions/user/:userId — Get individual teacher permission overrides
router.get("/user/:userId", getUserPermissionOverrides);

// PUT /api/v1/permissions/user/:userId — Save individual teacher permission overrides
router.put("/user/:userId", updateUserPermissionOverrides);

export default router;
