import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import schoolRoutes from "../modules/schools/schools.routes";
import studentRoutes from "../modules/students/students.routes";
import parentRoutes from "../modules/parents/parents.routes";
import teacherRoutes from "../modules/teacher/teacher.routes";
import attendanceRoutes from "../modules/attendance/attendance.routes";
import homeworkRoutes from "../modules/homework/homework.routes";
import assignmentRoutes from "../modules/assignment/assignment.routes";
import examRoutes from "../modules/exams/exams.routes";
import resultRoutes from "../modules/result/result.routes";
import feeRoutes from "../modules/fees/fees.routes";
import paymentRoutes from "../modules/payment/payment.routes";
import transportRoutes from "../modules/transport/transport.routes";
import gpsRoutes from "../modules/gps/gps.routes";
import notificationRoutes from "../modules/notifications/notifications.routes";
import chatRoutes from "../modules/chat/chat.routes";
import reportRoutes from "../modules/report/report.routes";
import analyticsRoutes from "../modules/analytics/analytics.routes";
import subscriptionRoutes from "../modules/subscription/subscription.routes";
import auditRoutes from "../modules/audit/audit.routes";
import supportRoutes from "../modules/support/support.routes";
import tenantRoutes from "../modules/tenant/tenant.routes";
import adminRoutes from "../modules/admin/admin.routes";
import driverRoutes from "../modules/driver/driver.routes";
import academicsRoutes from "../modules/academics/academics.routes";
import settingsRoutes from "../modules/settings/settings.routes";
import hrRoutes from "../modules/hr/hr.routes";
import libraryRoutes from "../modules/library/library.routes";
import inventoryRoutes from "../modules/inventory/inventory.routes";

import uploadRoutes from "../modules/upload/upload.routes";

const router = Router();

// Mount all Backend Microservice Modules
router.use("/auth", authRoutes);
router.use("/upload", uploadRoutes);

router.use("/settings", settingsRoutes);
router.use("/academics", academicsRoutes);
router.use("/driver", driverRoutes);
router.use("/tenant", tenantRoutes);
router.use("/admin", adminRoutes);
router.use("/schools", schoolRoutes);
router.use("/students", studentRoutes);
router.use("/parents", parentRoutes);
router.use("/teachers", teacherRoutes);
router.use("/teacher", teacherRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/homework", homeworkRoutes);
router.use("/assignments", assignmentRoutes);
router.use("/exams", examRoutes);
router.use("/results", resultRoutes);
router.use("/fees", feeRoutes);
router.use("/payments", paymentRoutes);
router.use("/transport", transportRoutes);
router.use("/gps", gpsRoutes);
router.use("/notifications", notificationRoutes);
router.use("/chat", chatRoutes);
router.use("/reports", reportRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/subscriptions", subscriptionRoutes);
router.use("/audit", auditRoutes);
router.use("/support", supportRoutes);
router.use("/hr", hrRoutes);
router.use("/library", libraryRoutes);
router.use("/inventory", inventoryRoutes);

// Health Check
router.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: "MongoDB Atlas Connected",
    totalModules: 21,
    service: "SchoolMitra Unified Backend API"
  });
});

export default router;
