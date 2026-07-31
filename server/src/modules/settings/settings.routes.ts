// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — System Settings & Integration Routes (Phase 13)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getSchoolProfile,
  updateSchoolProfile,
  getBranding,
  updateBranding,
  getAcademicSessions,
  createAcademicSession,
  getPermissionsMatrix,
  updatePermissionsMatrix,
  triggerBackup,
  getBackupHistory,
  getAuditLogs,
  getIntegrations,
  updateIntegrations
} from "./settings.controller";

const router = Router();

// School Profile & Branding
router.get("/school", getSchoolProfile);
router.put("/school", updateSchoolProfile);
router.get("/branding", getBranding);
router.put("/branding", updateBranding);

// Academic Sessions & RBAC
router.get("/academic-sessions", getAcademicSessions);
router.post("/academic-sessions", createAcademicSession);
router.get("/permissions", getPermissionsMatrix);
router.put("/permissions", updatePermissionsMatrix);

// Backup & Audit Logs
router.post("/backup/trigger", triggerBackup);
router.get("/backup/history", getBackupHistory);
router.get("/audit-logs", getAuditLogs);

// Integrations (SMTP, SMS, Maps, Firebase, Razorpay)
router.get("/integrations", getIntegrations);
router.put("/integrations", updateIntegrations);

export default router;
