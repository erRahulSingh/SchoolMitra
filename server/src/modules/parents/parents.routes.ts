// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Parent Management Routes
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import { authenticate } from "../../middleware/authGuards";
import {
  getParents,
  createParent,
  getParentById,
  updateParent,
  getParentChildren,
  toggleParentAlerts,
  getParentAttendanceFeed,
  getParentHomeworkFeed,
  getParentHomeworkById,
  getParentAssignmentsFeed,
  getParentAssignmentById,
  getParentWeeklyTestsFeed,
  getParentExamsFeed,
  getParentResultsFeed,
  getParentReportCardsFeed,
  getParentAnnouncementsFeed,
  getParentMaterialsFeed,
  getParentStudentPerformance,
  getParentExamById,
  getParentReportCardById,
  getSecureParentDocumentById
} from "./parents.controller";

import { getStudentDocuments } from "../documents/document.controller";
import { getParentCertificates } from "../certificates/certificate.controller";

const router = Router();

// Protect all parent-facing endpoints
router.use(authenticate);

// Secure Protected Document Stream Endpoint
router.get("/documents/:id", getSecureParentDocumentById);
router.get("/children/:studentId/documents", getStudentDocuments);
router.get("/children/:studentId/certificates", getParentCertificates);

// Standard Parent Admin APIs
router.get("/attendance", getParentAttendanceFeed);
router.get("/homework", getParentHomeworkFeed);
router.get("/homework/:id", getParentHomeworkById);
router.get("/assignments", getParentAssignmentsFeed);
router.get("/assignments/:id", getParentAssignmentById);
router.get("/weekly-tests", getParentWeeklyTestsFeed);
router.get("/exams", getParentExamsFeed);
router.get("/exams/:id", getParentExamById);
router.get("/results", getParentResultsFeed);
router.get("/report-cards", getParentReportCardsFeed);
router.get("/report-cards/:id", getParentReportCardById);
router.get("/announcements", getParentAnnouncementsFeed);
router.get("/materials", getParentMaterialsFeed);
router.get("/students/:studentId/performance", getParentStudentPerformance);
router.get("/analytics/child/:studentId", getParentStudentPerformance);

router.get("/transport/trip", (req, res) => {
  const trip = {
    busNo: "BUS-01",
    routeName: "Route 01",
    startTime: "07:00 AM",
    status: "IN PROGRESS"
  };
  return res.json({ success: true, trip });
});

router.get("/transport", (req, res) => {
  return res.json({
    success: true,
    transport: {
      studentId: "STUDENT-01",
      studentName: "Rahul Kumar",
      class: "8-A",
      transportEnabled: true,
      busId: "BUS-01",
      routeId: "ROUTE-01",
      pickupStop: "Main Market",
      dropStop: "Main Market"
    }
  });
});

router.get("/transport/bus", (req, res) => {
  return res.json({
    success: true,
    bus: {
      busId: "BUS-01",
      busNumber: "Bus 01",
      registrationNo: "DL 01 SM 1001",
      driver: {
        name: "Amit Kumar",
        phone: "+91 98765 43210"
      },
      route: {
        name: "Route 01",
        pickup: "Main Market",
        pickupTime: "07:35 AM",
        status: "Bus On Route"
      }
    }
  });
});

router.get("/", getParents);
router.post("/", createParent);
router.get("/:id", getParentById);
router.put("/:id", updateParent);
router.get("/:id/children", getParentChildren);
router.patch("/:id/alerts", toggleParentAlerts);

export default router;

