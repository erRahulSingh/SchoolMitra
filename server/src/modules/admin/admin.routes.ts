// @ts-nocheck
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
  createStudentAdmission,
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

// ════════════ SCHOOL ADMIN ACADEMIC CONTROL APIs ════════════
import { authenticate, requireSchool, requireRole } from "../../middleware/authGuards";
import {
  getAdminHomework,
  updateAdminHomework,
  deleteAdminHomework,
  publishAdminHomework,
  getAdminAssignments,
  updateAdminAssignment,
  deleteAdminAssignment,
  publishAdminAssignment,
  getAdminMaterials,
  updateAdminMaterial,
  deleteAdminMaterial,
  getAdminWeeklyTests,
  updateAdminWeeklyTest,
  publishAdminWeeklyTest,
  getAdminWeeklyTestResults,
  updateAdminWeeklyTestResult
} from "./adminAcademic.controller";

const schoolAdminGuards = [authenticate, requireSchool, requireRole("SchoolAdmin", "SuperAdmin")];

// School Announcement System
import {
  getAdminAnnouncements,
  createAdminAnnouncement,
  getAdminAnnouncementById,
  updateAdminAnnouncement,
  deleteAdminAnnouncement,
  publishAdminAnnouncement
} from "./adminAnnouncement.controller";

router.get("/announcements", schoolAdminGuards, getAdminAnnouncements);
router.post("/announcements", schoolAdminGuards, createAdminAnnouncement);
router.get("/announcements/:id", schoolAdminGuards, getAdminAnnouncementById);
router.put("/announcements/:id", schoolAdminGuards, updateAdminAnnouncement);
router.delete("/announcements/:id", schoolAdminGuards, deleteAdminAnnouncement);
router.patch("/announcements/:id/publish", schoolAdminGuards, publishAdminAnnouncement);
router.post("/announcements/:id/publish", schoolAdminGuards, publishAdminAnnouncement);


// Homework Admin control
router.get("/academics/homework", schoolAdminGuards, getAdminHomework);
router.put("/academics/homework/:id", schoolAdminGuards, updateAdminHomework);
router.delete("/academics/homework/:id", schoolAdminGuards, deleteAdminHomework);
router.patch("/academics/homework/:id/publish", schoolAdminGuards, publishAdminHomework);
router.post("/academics/homework/:id/publish", schoolAdminGuards, publishAdminHomework);

// Assignments Admin control
router.get("/academics/assignments", schoolAdminGuards, getAdminAssignments);
router.put("/academics/assignments/:id", schoolAdminGuards, updateAdminAssignment);
router.delete("/academics/assignments/:id", schoolAdminGuards, deleteAdminAssignment);
router.patch("/academics/assignments/:id/publish", schoolAdminGuards, publishAdminAssignment);
router.post("/academics/assignments/:id/publish", schoolAdminGuards, publishAdminAssignment);

// Materials Admin control
router.get("/academics/materials", schoolAdminGuards, getAdminMaterials);
router.put("/academics/materials/:id", schoolAdminGuards, updateAdminMaterial);
router.delete("/academics/materials/:id", schoolAdminGuards, deleteAdminMaterial);

// Weekly Tests Admin control
router.get("/academics/weekly-tests", schoolAdminGuards, getAdminWeeklyTests);
router.put("/academics/weekly-tests/:id", schoolAdminGuards, updateAdminWeeklyTest);
router.patch("/academics/weekly-tests/:id/publish", schoolAdminGuards, publishAdminWeeklyTest);
router.post("/academics/weekly-tests/:id/publish", schoolAdminGuards, publishAdminWeeklyTest);
router.get("/academics/weekly-tests/:id/results", schoolAdminGuards, getAdminWeeklyTestResults);
router.put("/academics/weekly-tests/results/:id", schoolAdminGuards, updateAdminWeeklyTestResult);

// Exams Admin control
import {
  createAdminExam,
  getAdminExams,
  getAdminExamById,
  updateAdminExam,
  deleteAdminExam,
  publishAdminExam
} from "./adminExam.controller";

import {
  getAdminAnalyticsOverview,
  getAdminAnalyticsAttendance,
  getAdminAnalyticsAcademic,
  getAdminAnalyticsExams,
  getAdminClassPerformance,
  getAdminStudentPerformance,
  getAdminAttendanceDetails,
  getAdminAcademicRisk,
  getAdminTeacherPerformance,
  getAdminHomeworkDetails,
  getAdminExamTermAnalytics,
  getAdminAnalyticsExport
} from "./adminAnalytics.controller";

// Admin Analytics Endpoints
router.get("/analytics/overview", schoolAdminGuards, getAdminAnalyticsOverview);
router.get("/analytics/students", schoolAdminGuards, getAdminAcademicRisk);
router.get("/analytics/classes", schoolAdminGuards, getAdminClassPerformance);
router.get("/analytics/attendance", schoolAdminGuards, getAdminAttendanceDetails);
router.get("/analytics/homework", schoolAdminGuards, getAdminHomeworkDetails);
router.get("/analytics/exams", schoolAdminGuards, getAdminExamTermAnalytics);
router.get("/analytics/teachers", schoolAdminGuards, getAdminTeacherPerformance);
router.get("/analytics/performance", schoolAdminGuards, getAdminAcademicRisk);
router.get("/analytics/export", schoolAdminGuards, getAdminAnalyticsExport);

// Legacy/Compatibility Analytics Endpoints
router.get("/analytics/class-performance", schoolAdminGuards, getAdminClassPerformance);
router.get("/analytics/attendance-details", schoolAdminGuards, getAdminAttendanceDetails);
router.get("/analytics/academic-risk", schoolAdminGuards, getAdminAcademicRisk);
router.get("/analytics/teacher-performance", schoolAdminGuards, getAdminTeacherPerformance);
router.get("/analytics/homework-details", schoolAdminGuards, getAdminHomeworkDetails);
router.get("/analytics/exam-term", schoolAdminGuards, getAdminExamTermAnalytics);
router.get("/students/:id/performance", schoolAdminGuards, getAdminStudentPerformance);

router.post("/exams", schoolAdminGuards, createAdminExam);
router.get("/exams", schoolAdminGuards, getAdminExams);
router.get("/exams/:id", schoolAdminGuards, getAdminExamById);
router.put("/exams/:id", schoolAdminGuards, updateAdminExam);
router.delete("/exams/:id", schoolAdminGuards, deleteAdminExam);
router.patch("/exams/:id/publish", schoolAdminGuards, publishAdminExam);
router.post("/exams/:id/publish", schoolAdminGuards, publishAdminExam);

// API Structure Aliases
router.post("/exam-schedules", schoolAdminGuards, createAdminExam);
router.get("/exam-schedules", schoolAdminGuards, getAdminExams);
router.get("/exam-schedules/:id", schoolAdminGuards, getAdminExamById);
router.put("/exam-schedules/:id", schoolAdminGuards, updateAdminExam);
router.delete("/exam-schedules/:id", schoolAdminGuards, deleteAdminExam);

router.get("/exam-results", schoolAdminGuards, getAdminMarksSubmissions);
router.patch("/exam-results/:id/review", schoolAdminGuards, reviewAdminMarksSubmission);
router.patch("/exam-results/:id/approve", schoolAdminGuards, approveAdminMarksSubmission);
router.patch("/exam-results/:id/reject", schoolAdminGuards, rejectAdminMarksSubmission);

router.get("/report-cards", schoolAdminGuards, getAdminReportCards);
router.post("/report-cards/generate", schoolAdminGuards, generateAdminReportCards);
router.patch("/report-cards/:id/approve", schoolAdminGuards, approveAdminReportCard);
router.patch("/report-cards/:id/publish", schoolAdminGuards, publishAdminReportCard);

// Marks submissions approval controls
import {
  getAdminMarksSubmissions,
  reviewAdminMarksSubmission,
  approveAdminMarksSubmission,
  rejectAdminMarksSubmission
} from "./adminAcademic.controller";

router.get("/academics/marks-submissions", schoolAdminGuards, getAdminMarksSubmissions);
router.patch("/academics/marks-submissions/:id/review", schoolAdminGuards, reviewAdminMarksSubmission);
router.patch("/academics/marks-submissions/:id/approve", schoolAdminGuards, approveAdminMarksSubmission);
router.patch("/academics/marks-submissions/:id/reject", schoolAdminGuards, rejectAdminMarksSubmission);

// Configurable grading system settings
import {
  getAdminGradingRules,
  saveAdminGradingRules
} from "./adminAcademic.controller";

router.get("/academics/grading-rules", schoolAdminGuards, getAdminGradingRules);
router.post("/academics/grading-rules", schoolAdminGuards, saveAdminGradingRules);

// Report cards workflow controls
import {
  getAdminReportCards,
  generateAdminReportCards,
  approveAdminReportCard,
  publishAdminReportCard
} from "./adminAcademic.controller";

router.get("/academics/report-cards", schoolAdminGuards, getAdminReportCards);
router.post("/academics/report-cards/generate", schoolAdminGuards, generateAdminReportCards);
router.patch("/academics/report-cards/:id/approve", schoolAdminGuards, approveAdminReportCard);
router.patch("/academics/report-cards/:id/publish", schoolAdminGuards, publishAdminReportCard);

// Active & Completed Trip Management Endpoints
import {
  getBuses,
  createBus,
  updateBus,
  getRoutes,
  createRoute,
  updateRoute,
  createStop,
  updateStop,
  assignBusRoute,
  getAssignments,
  getLiveTransport
} from "../transport/transport.controller";

router.post("/buses", schoolAdminGuards, createBus);
router.get("/buses", schoolAdminGuards, getBuses);
router.put("/buses/:id", schoolAdminGuards, updateBus);

router.post("/routes", schoolAdminGuards, createRoute);
router.get("/routes", schoolAdminGuards, getRoutes);
router.put("/routes/:id", schoolAdminGuards, updateRoute);

router.post("/stops", schoolAdminGuards, createStop);
router.put("/stops/:id", schoolAdminGuards, updateStop);

router.post("/transport/assignments", schoolAdminGuards, assignBusRoute);
router.get("/transport/assignments", schoolAdminGuards, getAssignments);
router.get("/transport/live", schoolAdminGuards, getLiveTransport);

router.get("/trips", (req, res) => {
  const trips = [
    { id: "TRIP-01", busNo: "BUS-01", routeName: "Route 01", startTime: "07:00 AM", status: "IN PROGRESS" },
    { id: "TRIP-02", busNo: "BUS-02", routeName: "Route 02", startTime: "07:15 AM", status: "COMPLETED" }
  ];
  return res.json({ success: true, trips });
});

router.get("/trips/:id", (req, res) => {
  const { id } = req.params;
  const trip = { id, busNo: "BUS-01", routeName: "Route 01", startTime: "07:00 AM", status: "IN PROGRESS" };
  return res.json({ success: true, trip });
});

// Legacy/System Endpoints
router.get("/stats", getDashboardStats);
router.get("/payments", getPaymentsList);
router.get("/support", getSupportTickets);

// ════════════ Teacher CRUD & Permissions Management (Guarded) ════════════
import adminTeacherRoutes from "./adminTeacher.routes";
router.use("/", adminTeacherRoutes);

export default router;

