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
  getSuperAdminDashboard,
  getRevenueAnalytics,
  getSubscriptionsData,
  renewSubscription,
  createCoupon,
  getCoupons,
  toggleCouponStatus,
  deleteCoupon,
  processPaymentRefund,
  dispatchGatewayEvent,
  getSaaSInvoices,
  createSaaSInvoice,
  markSaaSInvoicePaid,
  getSaaSPlans,
  saveSaaSPlan,
  deleteSaaSPlan,
  getFeatureToggles,
  toggleFeatureFlag,
  createFeatureFlag,
  getSupportTickets,
  createSupportTicket,
  updateSupportTicket,
  sendSupportChatMessage,
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
  getAnalyticsCohorts,
  getGlobalNotifications,
  createGlobalNotification,
  deleteGlobalNotification,
  getServerHealth,
  getStorageUsage,
  getDatabaseBackups,
  triggerDatabaseBackup,
  deleteDatabaseBackup,
  getAuditLogs,
  getSystemActivityLogs,
  getGlobalSettings,
  saveGlobalSettings,
  getAdminTeacherLeaves,
  updateAdminTeacherLeaveStatus,
  getPendingAcademicApprovals,
  approveAcademicSubmission,
  rejectAcademicSubmission,
  getAttendanceCorrectionRequests,
  approveAttendanceCorrectionRequest,
  getTeacherActivityMonitoringDashboard,
  getTeachersPerformanceReport,
  getSingleTeacherPerformanceDossier
} from "./admin.controller";






const router = Router();

// Super Admin Master Telemetry, Invoices, Feature Toggles, Support Tickets, Announcements, Analytics, Notifications, Health, Storage, Backups & Settings
router.get("/super-dashboard", getSuperAdminDashboard);
router.get("/revenue-analytics", getRevenueAnalytics);
router.get("/subscriptions-data", getSubscriptionsData);
router.post("/subscriptions-renew/:id", renewSubscription);
router.get("/coupons", getCoupons);
router.post("/coupons", createCoupon);
router.patch("/coupons/:code/toggle", toggleCouponStatus);
router.delete("/coupons/:code", deleteCoupon);
router.get("/payments", getPaymentsList);
router.post("/payments-refund/:id", processPaymentRefund);
router.post("/gateway-dispatch", dispatchGatewayEvent);
router.get("/invoices", getSaaSInvoices);
router.post("/invoices", createSaaSInvoice);
router.patch("/invoices/:id/pay", markSaaSInvoicePaid);
router.get("/saas-plans", getSaaSPlans);
router.post("/saas-plans", saveSaaSPlan);
router.delete("/saas-plans/:id", deleteSaaSPlan);
router.get("/feature-toggles", getFeatureToggles);
router.patch("/feature-toggles/:id/toggle", toggleFeatureFlag);
router.post("/feature-toggles", createFeatureFlag);
router.get("/support-tickets", getSupportTickets);
router.post("/support-tickets", createSupportTicket);
router.patch("/support-tickets/:id", updateSupportTicket);
router.post("/support-chat", sendSupportChatMessage);
router.get("/announcements", getAnnouncements);
router.post("/announcements", createAnnouncement);
router.delete("/announcements/:id", deleteAnnouncement);
router.get("/analytics-cohorts", getAnalyticsCohorts);
router.get("/global-notifications", getGlobalNotifications);
router.post("/global-notifications", createGlobalNotification);
router.delete("/global-notifications/:id", deleteGlobalNotification);
router.get("/server-health", getServerHealth);
router.get("/storage-usage", getStorageUsage);
router.get("/backups", getDatabaseBackups);
router.post("/backups-trigger", triggerDatabaseBackup);
router.delete("/backups/:id", deleteDatabaseBackup);
router.get("/audit-logs", getAuditLogs);
router.get("/activity-logs", getSystemActivityLogs);
router.get("/global-settings", getGlobalSettings);
router.post("/global-settings", saveGlobalSettings);

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

// Teacher Leave Management Endpoints for School Admin
router.get("/teacher-leaves", getAdminTeacherLeaves);
router.patch("/teacher-leaves/:id/status", updateAdminTeacherLeaveStatus);

// Critical Academic Document Approvals for School Admin
router.get("/academic-approvals/pending", getPendingAcademicApprovals);
router.patch("/academic-approvals/:id/approve", approveAcademicSubmission);
router.patch("/academic-approvals/:id/reject", rejectAcademicSubmission);

// Attendance Locking & Correction Approval Endpoints for School Admin
router.get("/attendance-corrections", getAttendanceCorrectionRequests);
router.patch("/attendance-corrections/:id/approve", approveAttendanceCorrectionRequest);

// Teacher Activity Monitoring Dashboard Endpoints for School Admin
router.get("/teacher-activity-dashboard", getTeacherActivityMonitoringDashboard);
router.get("/teacher-monitoring", getTeacherActivityMonitoringDashboard);

// Teacher 360 Performance Report Endpoints for School Admin / Principal Desk
router.get("/teachers/performance", getTeachersPerformanceReport);
router.get("/teachers/:teacherId/performance", getSingleTeacherPerformanceDossier);

// Legacy/System Endpoints
router.get("/stats", getDashboardStats);
router.get("/payments", getPaymentsList);
router.get("/support", getSupportTickets);






export default router;
