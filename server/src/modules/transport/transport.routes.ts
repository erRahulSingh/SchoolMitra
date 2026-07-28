import { Router } from "express";
import { 
  getBuses, createBus,
  getDrivers, createDriver,
  getRoutes, createRoute,
  getStops, createStop,
  getTrips, createTrip,
  getPickupLogs, createPickupLog,
  getDropLogs, createDropLog
} from "./transport.controller";

const router = Router();

// Buses routes
router.get("/buses", getBuses);
router.post("/buses", createBus);

// Drivers routes
router.get("/drivers", getDrivers);
router.post("/drivers", createDriver);

// Routes mapping
router.get("/routes", getRoutes);
router.post("/routes", createRoute);

// Stops mapping
router.get("/stops", getStops);
router.post("/stops", createStop);

// Trips tracking
router.get("/trips", getTrips);
router.post("/trips", createTrip);

// Logs
router.get("/pickup-logs", getPickupLogs);
router.post("/pickup-logs", createPickupLog);
router.get("/drop-logs", getDropLogs);
router.post("/drop-logs", createDropLog);

export default router;
