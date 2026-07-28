import { Router } from "express";
import { 
  driverLogin, getDriverProfile, getAssignedBus, getAssignedRoute, 
  getStudentList, startTrip, endTrip, updateGPSLocation, 
  pickupStudent, dropStudent, triggerSOSAlert, getTripHistory 
} from "./driver.controller";

const router = Router();

// Driver Auth & Profile Endpoints
router.post("/login", driverLogin);
router.get("/profile", getDriverProfile);

// Vehicle & Route Endpoints
router.get("/bus", getAssignedBus);
router.get("/route", getAssignedRoute);
router.get("/students", getStudentList);

// Trip Workflow & Telemetry Endpoints
router.post("/trip/start", startTrip);
router.post("/trip/end", endTrip);
router.post("/gps/update", updateGPSLocation);

// Passenger Boarding / Drop Endpoints
router.post("/student/pickup", pickupStudent);
router.post("/student/drop", dropStudent);

// Emergency & History Endpoints
router.post("/sos", triggerSOSAlert);
router.get("/trip/history", getTripHistory);

export default router;
