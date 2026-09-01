import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import schoolRoutes from "../modules/schools/schools.routes";
import studentRoutes from "../modules/students/students.routes";
import parentRoutes from "../modules/parents/parents.routes";
import teacherRoutes from "../modules/teacher/teacher.routes";
import attendanceRoutes from "../modules/attendance/attendance.routes";
import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import schoolRoutes from "../modules/schools/schools.routes";
import studentRoutes from "../modules/students/students.routes";
import parentRoutes from "../modules/parents/parents.routes";
import teacherRoutes from "../modules/teacher/teacher.routes";
import attendanceRoutes from "../modules/attendance/attendance.routes";
import examRoutes from "../modules/exams/exams.routes";
import feeRoutes from "../modules/fees/fees.routes";
import paymentRoutes from "../modules/payment/payment.routes";
import transportRoutes from "../modules/transport/transport.routes";
import gpsRoutes from "../modules/gps/gps.routes";
import notificationRoutes from "../modules/notifications/notifications.routes";
import chatRoutes from "../modules/chat/chat.routes";
import circularRoutes from "../modules/communication/circular.routes";
import noticeRoutes from "../modules/communication/notice.routes";
import emergencyRoutes from "../modules/communication/emergency.routes";
import reportRoutes from "../modules/report/report.routes";
import analyticsRoutes from "../modules/analytics/analytics.routes";
import auditRoutes from "../modules/audit/audit.routes";
import supportRoutes from "../modules/support/support.routes";
import medicalRoutes from "../modules/medical/medical.routes";
import galleryRoutes from "../modules/gallery/gallery.routes";
import tenantRoutes from "../modules/tenant/tenant.routes";
import adminRoutes from "../modules/admin/admin.routes";
import driverRoutes from "../modules/driver/driver.routes";
import academicsRoutes from "../modules/academics/academics.routes";
import settingsRoutes from "../modules/settings/settings.routes";
import hrRoutes from "../modules/hr/hr.routes";
import libraryRoutes from "../modules/library/library.routes";
import inventoryRoutes from "../modules/inventory/inventory.routes";
import permissionsRoutes from "../modules/permissions/permissions.routes";
import academicRoutes from "../modules/academic/academic.routes";
import calendarRoutes from "../modules/calendar/calendar.routes";
import eventsRoutes from "../modules/events/events.routes";
import leaveRoutes from "../modules/leave/leave.routes";
import adminDriverRoutes from "../modules/admin/adminDriver.routes";

import uploadRoutes from "../modules/upload/upload.routes";
import documentRoutes from "../modules/documents/document.routes";
import certificateRoutes from "../modules/certificates/certificate.routes";
import liveClassesRoutes from "../modules/live-classes/live-classes.routes";
import hostelRoutes from "../modules/hostel/hostel.routes";
import canteenRoutes from "../modules/canteen/canteen.routes";

const router = Router();

// Mount all Backend Microservice Modules
router.use("/auth", authRoutes);
router.use("/upload", uploadRoutes);
router.use("/documents", documentRoutes);
router.use("/certificates", certificateRoutes);

// Admin Microservice Aliases for Documents & Certificates
router.use("/admin/certificates", certificateRoutes);
router.use("/admin/documents", documentRoutes);
router.use("/admin/students", documentRoutes);
router.use("/admin/teachers", documentRoutes);

router.use("/settings", settingsRoutes);
router.use("/academics", academicsRoutes);
router.use("/driver", driverRoutes);
router.use("/tenant", tenantRoutes);
router.use("/admin", adminRoutes);
router.use("/admin/drivers", adminDriverRoutes);
router.use("/admin", academicRoutes);
router.use("/schools", schoolRoutes);
router.use("/students", studentRoutes);
router.use("/parents", parentRoutes);
router.use("/parent", parentRoutes);
router.use("/teachers", teacherRoutes);
router.use("/teacher", teacherRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/exams", examRoutes);
router.use("/fees", feeRoutes);
router.use("/payments", paymentRoutes);
router.use("/transport", transportRoutes);
router.use("/gps", gpsRoutes);
router.use("/notifications", notificationRoutes);
router.use("/chat", chatRoutes);
router.use("/", circularRoutes);
router.use("/communication", circularRoutes);
router.use("/communication", noticeRoutes);
router.use("/", emergencyRoutes);
router.use("/communication", emergencyRoutes);
router.use("/reports", reportRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/audit", auditRoutes);
router.use("/support", supportRoutes);
router.use("/medical", medicalRoutes);
router.use("/gallery", galleryRoutes);
router.use("/hr", hrRoutes);
router.use("/library", libraryRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/permissions", permissionsRoutes);
router.use("/calendar", calendarRoutes);
router.use("/events", eventsRoutes);
router.use("/leave", leaveRoutes);
router.use("/live-classes", liveClassesRoutes);
router.use("/hostel", hostelRoutes);
router.use("/canteen", canteenRoutes);

// Health Check
import mongoose from "mongoose";

router.get("/health", (req, res) => {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  const dbState = states[mongoose.connection.readyState] || "unknown";
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    databaseStatus: dbState,
    databaseHost: mongoose.connection.host || null,
    databaseName: mongoose.connection.name || null,
    totalModules: 21,
    service: "SchoolMitra Unified Backend API"
  });
});

export default router;
