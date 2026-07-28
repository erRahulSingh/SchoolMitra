import { Request, Response } from "express";

// Mock Data Models for Driver API Microservices
const demoDriver = {
  id: "drv_101",
  name: "Ram Singh",
  email: "driver@schoolmitra.com",
  phone: "+91 98111 22334",
  empId: "EMP-DRV-104",
  licenseNo: "DL-04-2019-883012",
  status: "Active"
};

const demoBus = {
  busNo: "Bus #01",
  vehicleNo: "DL 01 AB 4321",
  model: "Tata Starbus Ultra 2024",
  capacity: "42 Passengers",
  fuelLevel: "78% (93.6 L)",
  insuranceExpiry: "15 Nov 2027",
  fitnessExpiry: "28 March 2028"
};

const demoRoute = {
  routeName: "Route 1 - Dwarka Sector 12 Express",
  totalStops: 12,
  totalStudents: 42,
  distance: "14.2 km",
  estimatedTime: "45 Mins"
};

const demoStudents = [
  { id: "s1", name: "Rahul Sharma", class: "Class 5-A", parentName: "Vikram Sharma", stopName: "Sector 12 Market Gate", status: "Waiting" },
  { id: "s2", name: "Ananya Patel", class: "Class 4-B", parentName: "Rajesh Patel", stopName: "Sector 10 Metro Gate", status: "Boarded" },
  { id: "s3", name: "Aarav Gupta", class: "Class 6-C", parentName: "Sunil Gupta", stopName: "Sector 6 Market", status: "Waiting" }
];

export const driverLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  return res.json({
    success: true,
    message: "Driver authenticated successfully",
    token: "jwt_token_driver_demo_998123",
    driver: demoDriver
  });
};

export const getDriverProfile = async (req: Request, res: Response) => {
  return res.json({ success: true, driver: demoDriver });
};

export const getAssignedBus = async (req: Request, res: Response) => {
  return res.json({ success: true, bus: demoBus });
};

export const getAssignedRoute = async (req: Request, res: Response) => {
  return res.json({ success: true, route: demoRoute });
};

export const getStudentList = async (req: Request, res: Response) => {
  return res.json({ success: true, count: demoStudents.length, students: demoStudents });
};

export const startTrip = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    message: "Trip started successfully. GPS tracking broadcasting to admin and parents.",
    tripId: "trip_" + Date.now(),
    status: "ACTIVE"
  });
};

export const endTrip = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    message: "Trip ended successfully. Telemetry summary logged.",
    status: "COMPLETED"
  });
};

export const updateGPSLocation = async (req: Request, res: Response) => {
  const { lat, lng, speed, busNo } = req.body;
  return res.json({
    success: true,
    message: "GPS coordinates updated & socket broadcasted.",
    coordinates: { lat: lat || 28.5821, lng: lng || 77.0500, speed: speed || 38 },
    timestamp: new Date().toISOString()
  });
};

export const pickupStudent = async (req: Request, res: Response) => {
  const { studentId, studentName } = req.body;
  return res.json({
    success: true,
    message: `Student ${studentName || "Rahul"} marked as Picked. Parent notified via push alert.`,
    timestamp: new Date().toLocaleTimeString()
  });
};

export const dropStudent = async (req: Request, res: Response) => {
  const { studentId, studentName } = req.body;
  return res.json({
    success: true,
    message: `Student ${studentName || "Rahul"} marked as Dropped at School. Parent notified.`,
    timestamp: new Date().toLocaleTimeString()
  });
};

export const triggerSOSAlert = async (req: Request, res: Response) => {
  const { category, notes } = req.body;
  return res.json({
    success: true,
    message: `🚨 EMERGENCY SOS (${category || "CRITICAL"}) BROADCASTED TO SCHOOL ADMIN & PARENTS!`,
    incidentId: "sos_" + Date.now(),
    timestamp: new Date().toISOString()
  });
};

export const getTripHistory = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    trips: [
      { id: "t1", date: "28 July 2026", route: "Route 1 Express", distance: "14.2 km", students: 42, startTime: "07:10 AM", endTime: "07:55 AM" },
      { id: "t2", date: "27 July 2026", route: "Route 1 Express", distance: "14.8 km", students: 40, startTime: "02:15 PM", endTime: "03:02 PM" }
    ]
  });
};
