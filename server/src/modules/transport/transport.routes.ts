// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Transport Fleet Routes (Phase 10)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getBuses,
  createBus,
  getRoutes,
  createRoute,
  getStops,
  createStop,
  getDrivers,
  createDriver,
  startTrip,
  endTrip,
  assignStudentTransport,
  triggerSOSAlert,
  getSOSAlerts
} from "./transport.controller";

const router = Router();

// Fleet Entities
router.get("/buses", getBuses);
router.post("/buses", createBus);
router.get("/routes", getRoutes);
router.post("/routes", createRoute);
router.get("/stops", getStops);
router.post("/stops", createStop);
router.get("/drivers", getDrivers);
router.post("/drivers", createDriver);

// Trips & Assignments
router.post("/trip/start", startTrip);
router.post("/trip/end", endTrip);
router.post("/assign-student", assignStudentTransport);

// Emergency SOS Safety Alerts
router.post("/sos/trigger", triggerSOSAlert);
router.get("/sos/alerts", getSOSAlerts);

export default router;
