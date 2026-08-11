// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Admin Teacher & Permission Routes
// Mounted at /api/v1/admin (alongside existing admin routes)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import { authenticate, requireSchool, requireRole, requirePermission } from "../../middleware/authGuards";
import {
  getAdminTeachers,
  getAdminTeacherById,
  createAdminTeacher,
  updateAdminTeacher,
  updateAdminTeacherStatus,
  getAdminPermissions,
  getAdminRoles,
  getAdminRolePermissions,
  updateAdminRolePermissions,
  getAdminTeacherPermissions,
  updateAdminTeacherPermissions,
  getTeacherMe,
  getTeacherMyPermissions
} from "./adminTeacher.controller";

const router = Router();

// ════════════ SCHOOL ADMIN — TEACHER MANAGEMENT APIs ════════════
// All require: authenticate → requireSchool → requireRole(SchoolAdmin/SuperAdmin)

// GET    /api/v1/admin/teachers               — List all teachers
router.get("/teachers",
  authenticate, requireSchool, requireRole("SchoolAdmin", "SuperAdmin", "Principal"),
  getAdminTeachers
);

// GET    /api/v1/admin/teachers/:id            — Get single teacher
router.get("/teachers/:id",
  authenticate, requireSchool, requireRole("SchoolAdmin", "SuperAdmin", "Principal"),
  getAdminTeacherById
);

// POST   /api/v1/admin/teachers               — Create new teacher
router.post("/teachers",
  authenticate, requireSchool, requireRole("SchoolAdmin", "SuperAdmin"),
  createAdminTeacher
);

// PUT    /api/v1/admin/teachers/:id            — Update teacher profile
router.put("/teachers/:id",
  authenticate, requireSchool, requireRole("SchoolAdmin", "SuperAdmin"),
  updateAdminTeacher
);

// PATCH  /api/v1/admin/teachers/:id/status     — Toggle teacher status
router.patch("/teachers/:id/status",
  authenticate, requireSchool, requireRole("SchoolAdmin", "SuperAdmin"),
  updateAdminTeacherStatus
);

// ════════════ PERMISSIONS MANAGEMENT APIs ════════════

// GET    /api/v1/admin/permissions             — Global permissions registry
router.get("/permissions",
  authenticate, requireSchool, requireRole("SchoolAdmin", "SuperAdmin", "Principal"),
  getAdminPermissions
);

// GET    /api/v1/admin/roles                   — List all roles
router.get("/roles",
  authenticate, requireSchool, requireRole("SchoolAdmin", "SuperAdmin", "Principal"),
  getAdminRoles
);

// GET    /api/v1/admin/roles/:id/permissions   — Get role permissions
router.get("/roles/:id/permissions",
  authenticate, requireSchool, requireRole("SchoolAdmin", "SuperAdmin", "Principal"),
  getAdminRolePermissions
);

// PUT    /api/v1/admin/roles/:id/permissions   — Update role permissions
router.put("/roles/:id/permissions",
  authenticate, requireSchool, requireRole("SchoolAdmin", "SuperAdmin"),
  updateAdminRolePermissions
);

// GET    /api/v1/admin/teachers/:id/permissions — Get teacher individual permissions
router.get("/teachers/:id/permissions",
  authenticate, requireSchool, requireRole("SchoolAdmin", "SuperAdmin", "Principal"),
  getAdminTeacherPermissions
);

// PUT    /api/v1/admin/teachers/:id/permissions — Update teacher individual permissions
router.put("/teachers/:id/permissions",
  authenticate, requireSchool, requireRole("SchoolAdmin", "SuperAdmin"),
  updateAdminTeacherPermissions
);

export default router;
