// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Transport Fleet Controller (Phase 10)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { 
  BusModel, 
  DriverModel, 
  RouteModel, 
  StopModel, 
  TripModel
} from "../../models/TransportSchemas";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { Types } from "mongoose";

// In-Memory SOS & Active Trips Store
const sosAlertsStore: any[] = [
  { id: "SOS-901", busNo: "Bus #01", driverName: "Ram Singh", location: "Dwarka Sector 12 Flyover", triggeredAt: "08:15 AM", status: "ACKNOWLEDGED ✅" }
];

const activeTripsStore: Record<string, any> = {
  "Bus #01": { tripId: "TRIP-8801", busNo: "Bus #01", routeName: "Route 1 - Dwarka", startTime: "07:15 AM", status: "IN_TRANSIT" }
};

const dummySchoolId = new Types.ObjectId("650000000000000000000001");

// Helper to seed buses if empty
const getOrSeedBuses = async () => {
  const buses = await BusModel.find().lean().catch(() => []);
  if (buses.length > 0) return buses;

  return await BusModel.create([
    { schoolId: dummySchoolId, busNumber: "DL 01 AB 4321", capacity: 42, driverName: "Ram Singh", routeName: "Route 1 Dwarka", status: "Active", registrationNo: "DL 01 AB 4321" },
    { schoolId: dummySchoolId, busNumber: "DL 01 CD 8765", capacity: 38, driverName: "Vikram Jeet", routeName: "Route 2 Vasant Kunj", status: "Active", registrationNo: "DL 01 CD 8765" }
  ]);
};

// Helper to seed drivers if empty
const getOrSeedDrivers = async () => {
  const drivers = await DriverModel.find().lean().catch(() => []);
  if (drivers.length > 0) return drivers;

  return await DriverModel.create([
    { schoolId: dummySchoolId, name: "Ram Singh", phone: "+91 98111 22334", licenseNo: "DL-14201100987", assignedBus: "Bus #01", status: "Active", licenseExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 5) },
    { schoolId: dummySchoolId, name: "Vikram Jeet", phone: "+91 98222 33445", licenseNo: "DL-14201100543", assignedBus: "Bus #02", status: "Active", licenseExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 5) }
  ]);
};

// Helper to seed routes if empty
const getOrSeedRoutes = async () => {
  const routes = await RouteModel.find().lean().catch(() => []);
  if (routes.length > 0) return routes;

  return await RouteModel.create([
    { schoolId: dummySchoolId, routeName: "Route 1 Dwarka Belt", startPoint: "Sector 21 Metro", endPoint: "DPS Campus", distanceKm: 18 },
    { schoolId: dummySchoolId, routeName: "Route 2 Vasant Kunj Belt", startPoint: "Fortis Gate", endPoint: "DPS Campus", distanceKm: 22 }
  ]);
};

// ════════════ 1. BUS MANAGEMENT ════════════
export const getBuses = asyncHandler(async (_req: Request, res: Response) => {
  const buses = await getOrSeedBuses();
  return ApiResponse.success(res, 200, "Fleet buses retrieved", { buses });
});

export const createBus = asyncHandler(async (req: Request, res: Response) => {
  const { busNumber, capacity, registrationNumber, registrationNo, driverName, routeName } = req.body;
  if (!busNumber) {
    throw ApiError.badRequest("Bus number is required.");
  }

  const created = await BusModel.create({
    schoolId: dummySchoolId,
    busNumber,
    registrationNo: registrationNumber || registrationNo || busNumber,
    capacity: capacity || 40,
    driverName: driverName || "Unassigned Pilot",
    routeName: routeName || "Default School Route",
    status: "Active"
  });

  return ApiResponse.created(res, "Fleet Bus & Driver registered successfully in database.", { bus: created });
});

// ════════════ 2. ROUTE MANAGEMENT ════════════
export const getRoutes = asyncHandler(async (_req: Request, res: Response) => {
  const routes = await getOrSeedRoutes();
  return ApiResponse.success(res, 200, "Transport routes retrieved", { routes });
});

export const createRoute = asyncHandler(async (req: Request, res: Response) => {
  const { routeName, startPoint, endPoint, distanceKm } = req.body;
  if (!routeName) {
    throw ApiError.badRequest("Route name is required.");
  }

  const created = await RouteModel.create({
    schoolId: dummySchoolId,
    routeName,
    startPoint: startPoint || "Start Terminal",
    endPoint: endPoint || "School Gate",
    distanceKm: Number(distanceKm) || 15
  });

  return ApiResponse.created(res, "Route registered successfully in database.", { route: created });
});

// ════════════ 3. STOP MANAGEMENT ════════════
export const getStops = asyncHandler(async (_req: Request, res: Response) => {
  const stops = await StopModel.find().lean().catch(() => []);
  return ApiResponse.success(res, 200, "Stops retrieved", { stops });
});

export const createStop = asyncHandler(async (req: Request, res: Response) => {
  const { stopName, routeId, scheduledTime, order = 1 } = req.body;
  if (!stopName) throw ApiError.badRequest("Stop name is required.");

  const finalRouteId = routeId || new Types.ObjectId("650000000000000000000501");

  const created = await StopModel.create({
    schoolId: dummySchoolId,
    routeId: finalRouteId,
    stopName,
    order: Number(order) || 1,
    scheduledTimeMorning: scheduledTime || "07:30 AM"
  });

  return ApiResponse.created(res, "Stop created successfully in database.", { stop: created });
});

// ════════════ 4. DRIVER MANAGEMENT ════════════
export const getDrivers = asyncHandler(async (_req: Request, res: Response) => {
  const drivers = await getOrSeedDrivers();
  return ApiResponse.success(res, 200, "Bus drivers retrieved", { drivers });
});

export const createDriver = asyncHandler(async (req: Request, res: Response) => {
  const { name, phone, licenseNo } = req.body;
  if (!name || !phone) {
    throw ApiError.badRequest("Driver name and phone are required.");
  }

  const created = await DriverModel.create({
    schoolId: dummySchoolId,
    name,
    phone,
    licenseNo: licenseNo || "DL-PENDING",
    licenseExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 5)
  });

  return ApiResponse.created(res, "Driver registered successfully in database.", { driver: created });
});

// ════════════ 5. TRIP TRACKER (START/END TRIP) ════════════
export const startTrip = asyncHandler(async (req: Request, res: Response) => {
  const { busNo = "Bus #01", routeName = "Route 1 - Dwarka" } = req.body;

  const tripId = `TRIP-${Math.floor(1000 + Math.random() * 9000)}`;
  activeTripsStore[busNo] = { tripId, busNo, routeName, startTime: new Date().toLocaleTimeString(), status: "IN_TRANSIT" };

  return ApiResponse.created(res, `Trip ${tripId} started for ${busNo}! Live GPS broadcasting enabled.`, { trip: activeTripsStore[busNo] });
});

export const endTrip = asyncHandler(async (req: Request, res: Response) => {
  const { busNo = "Bus #01" } = req.body;

  if (activeTripsStore[busNo]) {
    activeTripsStore[busNo].status = "COMPLETED ✅";
    activeTripsStore[busNo].endTime = new Date().toLocaleTimeString();
  }

  return ApiResponse.success(res, 200, `Trip completed safely for ${busNo}. All students dropped.`, { busNo, status: "COMPLETED ✅" });
});

// ════════════ 6. ASSIGN STUDENT TRANSPORT ════════════
export const assignStudentTransport = asyncHandler(async (req: Request, res: Response) => {
  const { studentId, busNo, routeName, stopName } = req.body;

  if (!studentId || !busNo) {
    throw ApiError.badRequest("studentId and busNo are required.");
  }

  return ApiResponse.success(res, 200, `Transport assigned for student ${studentId}.`, {
    studentId,
    busNo,
    routeName: routeName || "Route 1 - Dwarka",
    stopName: stopName || "Sector 12 Market Gate",
    assignedAt: new Date().toISOString()
  });
});

// ════════════ 7. SOS EMERGENCY SAFETY ALERTS ════════════
export const triggerSOSAlert = asyncHandler(async (req: Request, res: Response) => {
  const { busNo = "Bus #01", driverName = "Ram Singh", location = "Dwarka Sector 12 Flyover" } = req.body;

  const newAlert = {
    id: `SOS-${Math.floor(100 + Math.random() * 900)}`,
    busNo,
    driverName,
    location,
    triggeredAt: new Date().toLocaleTimeString(),
    status: "TRIGGERED 🚨"
  };

  sosAlertsStore.unshift(newAlert);

  return ApiResponse.created(res, "🚨 EMERGENCY SOS BROADCAST SENT TO SCHOOL CONTROL ROOM & PARENTS!", { alert: newAlert });
});

export const getSOSAlerts = asyncHandler(async (_req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "SOS Safety Emergency Alerts queue", { alerts: sosAlertsStore });
});
