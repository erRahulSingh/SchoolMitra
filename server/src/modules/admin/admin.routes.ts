import { Router } from "express";
import { 
  getDashboardOverview, 
  getDashboardCards, 
  getDashboardCharts, 
  getDashboardRecent, 
  getDashboardCalendar,
  getDashboardStats, 
  getPaymentsList, 
  getSupportTickets,
  getSystemUsers,
  createSystemUser,
  updateSystemUser,
  deleteSystemUser,
  getRbacMatrix,
  updateRbacMatrix,
  getIntegrations,
  updateIntegrations,
  getAuditLogs,
  getBackups,
  createBackupSnapshot,
  getActiveSessions,
  terminateSession,
  getSaasSubscription,
  updateSaasSubscription,
  getApiKeys,
  createApiKey,
  revokeApiKey,
  getSystemHealth,
  getStudentsList,
  createStudentAdmission
} from "./admin.controller";

const router = Router();

// Phase 3 Dashboard Endpoints
router.get("/dashboard/overview", getDashboardOverview);
router.get("/dashboard/cards", getDashboardCards);
router.get("/dashboard/charts", getDashboardCharts);
router.get("/dashboard/recent", getDashboardRecent);
router.get("/dashboard/activity", getDashboardRecent);
router.get("/dashboard/calendar", getDashboardCalendar);

// Student Admissions Portal Endpoints
router.get("/students", getStudentsList);
router.post("/students", createStudentAdmission);

// System Users Management CRUD Endpoints
router.get("/users", getSystemUsers);
router.post("/users", createSystemUser);
router.put("/users/:id", updateSystemUser);
router.delete("/users/:id", deleteSystemUser);

// RBAC Matrix Endpoints
router.get("/rbac", getRbacMatrix);
router.post("/rbac", updateRbacMatrix);
router.put("/rbac", updateRbacMatrix);

// Integrations & Gateway Endpoints
router.get("/integrations", getIntegrations);
router.post("/integrations", updateIntegrations);
router.put("/integrations", updateIntegrations);

// Audit Trail Logs Endpoint
router.get("/audit-logs", getAuditLogs);

// Backups & Recovery Endpoints
router.get("/backups", getBackups);
router.post("/backups", createBackupSnapshot);

// Security & Sessions Endpoints
router.get("/sessions", getActiveSessions);
router.delete("/sessions/:id", terminateSession);

// SaaS Subscription Endpoints
router.get("/subscription", getSaasSubscription);
router.post("/subscription", updateSaasSubscription);
router.put("/subscription", updateSaasSubscription);

// Developer API Keys Endpoints
router.get("/api-keys", getApiKeys);
router.post("/api-keys", createApiKey);
router.delete("/api-keys/:id", revokeApiKey);

// System Health Telemetry Endpoint
router.get("/health", getSystemHealth);

// Legacy/System Endpoints
router.get("/stats", getDashboardStats);
router.get("/payments", getPaymentsList);
router.get("/support", getSupportTickets);

export default router;
