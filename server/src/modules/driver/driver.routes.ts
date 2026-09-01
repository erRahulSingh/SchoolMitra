// @ts-nocheck
// @ts-nocheck
import { Router } from "express";
import { 
  driverLogin, driverRegister, getDriverProfile, getAssignedBus, getAssignedRoute, 
  getStudentList, startTrip, endTrip, updateGPSLocation, 
  pickupStudent, dropStudent, triggerSOSAlert, getTripHistory 
} from "./driver.controller";

const router = Router();

// Driver Auth & Profile Endpoints
router.post("/login", driverLogin);
router.post("/register", driverRegister);
router.post("/signup", driverRegister);
router.get("/profile", getDriverProfile);

// Vehicle & Route Endpoints
router.get("/bus", getAssignedBus);
router.get("/route", getAssignedRoute);
router.get("/students", getStudentList);
router.get("/today", (req, res) => {
  return res.json({
    success: true,
    trip: {
      busNo: "BUS-01",
      routeName: "Route 01",
      startTime: "07:00 AM",
      status: "IN PROGRESS",
      studentsCount: 42,
      presentCount: 39,
      absentCount: 3
    }
  });
});

// Trip Workflow & Telemetry Endpoints
router.post("/trip/start", startTrip);
router.post("/trips/start", startTrip);
router.post("/trip/end", endTrip);
router.post("/trips/end", endTrip);
router.post("/gps/update", updateGPSLocation);

// Passenger Boarding / Drop Endpoints
router.post("/student/pickup", pickupStudent);
router.post("/student/drop", dropStudent);
router.post("/students/:id/pickup", pickupStudent);
router.post("/students/:id/drop", dropStudent);

// Emergency & History Endpoints
router.post("/sos", triggerSOSAlert);
router.get("/trip/history", getTripHistory);

export default router;
