import { Router } from "express";
import { authenticate } from "../../middleware/authGuards";
import { requireActiveSchool } from "../../middleware/tenantMiddleware";
import {
  getBuses,
  createBus,
  updateBus,
  deleteBus,
  getRoutes,
  createRoute,
  getStops,
  createStop,
  getDrivers,
  createDriver,
  startTrip,
  endTrip,
  assignStudentTransport,
  getStudentTransportAssignments,
  assignBusRoute,
  getBusRouteAssignments,
  triggerSOSAlert,
  getSOSAlerts
} from "./transport.controller";

const router = Router();

// ─── STEP 23: CENTRAL TRANSPORT AUTH & TENANT STATUS GUARDS ───
router.use(authenticate);
router.use(requireActiveSchool);

// Fleet Entities
router.get("/buses", getBuses);
router.post("/buses", createBus);
router.put("/buses/:id", updateBus);
router.delete("/buses/:id", deleteBus);
router.get("/routes", getRoutes);
router.post("/routes", createRoute);
router.get("/stops", getStops);
router.post("/stops", createStop);
router.get("/drivers", getDrivers);
router.post("/drivers", createDriver);

// Assignments
router.post("/bus-route-assignments", assignBusRoute);
router.get("/bus-route-assignments", getBusRouteAssignments);
router.post("/student-assignments", assignStudentTransport);
router.get("/student-assignments", getStudentTransportAssignments);

// Trips & Legacy Assignments
router.post("/trip/start", startTrip);
router.post("/trip/end", endTrip);
router.post("/assign-student", assignStudentTransport);

// Emergency SOS Safety Alerts
router.post("/sos/trigger", triggerSOSAlert);
router.get("/sos/alerts", getSOSAlerts);

export default router;
