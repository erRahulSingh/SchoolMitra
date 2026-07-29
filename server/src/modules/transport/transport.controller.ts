// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Transport & GPS Fleet Controller
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { 
  BusModel, 
  DriverModel, 
  RouteModel, 
  StopModel, 
  TripModel, 
  PickupLogModel, 
  DropLogModel 
} from "../../models/TransportSchemas";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

// ════════════ 1. BUS MANAGEMENT ════════════
export const getBuses = asyncHandler(async (_req: Request, res: Response) => {
  const data = await BusModel.find().lean();
  
  const fallback = [
    { _id: "650000000000000000000301", busNumber: "Bus #01 (DL 01 AB 4321)", registrationNumber: "DL 01 AB 4321", capacity: 42, driverName: "Ram Singh", routeName: "Route 1 - Dwarka", status: "Active", gpsStatus: "Broadcasting" },
    { _id: "650000000000000000000302", busNumber: "Bus #02 (DL 01 CD 5678)", registrationNumber: "DL 01 CD 5678", capacity: 42, driverName: "Suresh Kumar", routeName: "Route 2 - Vasant Kunj", status: "Active", gpsStatus: "Broadcasting" },
    { _id: "650000000000000000000303", busNumber: "Bus #03 (DL 01 EF 9012)", registrationNumber: "DL 01 EF 9012", capacity: 36, driverName: "Mohan Verma", routeName: "Route 3 - Janakpuri", status: "Active", gpsStatus: "Broadcasting" }
  ];

  const result = data.length > 0 ? data : fallback;
  return ApiResponse.success(res, 200, "Fleet buses retrieved", { buses: result, data: result, count: result.length });
});

export const createBus = asyncHandler(async (req: Request, res: Response) => {
  const { busNumber, capacity, registrationNumber } = req.body;
  if (!busNumber) {
    return res.status(400).json({ success: false, message: "Bus number is required." });
  }

  const created = await BusModel.create({ busNumber, registrationNumber: registrationNumber || busNumber, capacity: capacity || 40 });
  return ApiResponse.created(res, "Bus registered successfully.", { bus: created, data: created });
});

// ════════════ 2. DRIVER MANAGEMENT ════════════
export const getDrivers = asyncHandler(async (_req: Request, res: Response) => {
  const data = await DriverModel.find().lean();

  const fallback = [
    { _id: "650000000000000000000401", name: "Ram Singh", phone: "+91 98111 22334", licenseNo: "DL-142011002345", assignedBus: "Bus #01", status: "Active" },
    { _id: "650000000000000000000402", name: "Suresh Kumar", phone: "+91 98222 33445", licenseNo: "DL-142011005678", assignedBus: "Bus #02", status: "Active" }
  ];

  const result = data.length > 0 ? data : fallback;
  return ApiResponse.success(res, 200, "Bus drivers retrieved", { drivers: result, data: result, count: result.length });
});

export const createDriver = asyncHandler(async (req: Request, res: Response) => {
  const { name, phone, licenseNo } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: "Driver name and phone are required." });
  }

  const created = await DriverModel.create({ name, phone, licenseNo: licenseNo || "DL-PENDING" });
  return ApiResponse.created(res, "Driver registered successfully.", { driver: created, data: created });
});

// ════════════ 3. ROUTE MANAGEMENT ════════════
export const getRoutes = asyncHandler(async (_req: Request, res: Response) => {
  const data = await RouteModel.find().lean();

  const fallback = [
    { _id: "650000000000000000000501", routeName: "Route 1 - Dwarka Express", startPoint: "Sector 21 Metro Station", endPoint: "DPS Dwarka Campus", totalStops: 8 },
    { _id: "650000000000000000000502", routeName: "Route 2 - Vasant Kunj Line", startPoint: "Fortis Hospital Gate", endPoint: "DPS Dwarka Campus", totalStops: 6 }
  ];

  const result = data.length > 0 ? data : fallback;
  return ApiResponse.success(res, 200, "Transport routes retrieved", { routes: result, data: result, count: result.length });
});

export const createRoute = asyncHandler(async (req: Request, res: Response) => {
  const { routeName, startPoint, endPoint } = req.body;
  if (!routeName) {
    return res.status(400).json({ success: false, message: "Route name is required." });
  }

  const created = await RouteModel.create({ routeName, startPoint, endPoint });
  return ApiResponse.created(res, "Route registered successfully.", { route: created, data: created });
});

// ════════════ 4. STOP MANAGEMENT ════════════
export const getStops = asyncHandler(async (_req: Request, res: Response) => {
  const data = await StopModel.find().lean();
  return ApiResponse.success(res, 200, "Stops retrieved", { stops: data, data, count: data.length });
});

export const createStop = asyncHandler(async (req: Request, res: Response) => {
  const { stopName, routeId, scheduledTime } = req.body;
  if (!stopName || !routeId) {
    return res.status(400).json({ success: false, message: "Stop name and route id are required." });
  }

  const created = await StopModel.create({ stopName, routeId, scheduledTime });
  return ApiResponse.created(res, "Stop registered successfully.", { stop: created, data: created });
});

// ════════════ 5. TRIP MANAGEMENT ════════════
export const getTrips = asyncHandler(async (_req: Request, res: Response) => {
  const data = await TripModel.find().lean();
  return ApiResponse.success(res, 200, "Trips retrieved", { trips: data, data, count: data.length });
});

export const createTrip = asyncHandler(async (req: Request, res: Response) => {
  const { busId, driverId, status } = req.body;
  const created = await TripModel.create({ busId, driverId, status: status || "Scheduled" });
  return ApiResponse.created(res, "Trip logged successfully.", { trip: created, data: created });
});

// ════════════ 6. PICKUP LOGS ════════════
export const getPickupLogs = asyncHandler(async (_req: Request, res: Response) => {
  const data = await PickupLogModel.find().lean();
  return ApiResponse.success(res, 200, "Pickup logs retrieved", { logs: data, data, count: data.length });
});

export const createPickupLog = asyncHandler(async (req: Request, res: Response) => {
  const { studentId, stopId, time } = req.body;
  const created = await PickupLogModel.create({ studentId, stopId, time: time || new Date().toISOString() });
  return ApiResponse.created(res, "Pickup log recorded.", { log: created, data: created });
});

// ════════════ 7. DROP LOGS ════════════
export const getDropLogs = asyncHandler(async (_req: Request, res: Response) => {
  const data = await DropLogModel.find().lean();
  return ApiResponse.success(res, 200, "Drop logs retrieved", { logs: data, data, count: data.length });
});

export const createDropLog = asyncHandler(async (req: Request, res: Response) => {
  const { studentId, stopId, time } = req.body;
  const created = await DropLogModel.create({ studentId, stopId, time: time || new Date().toISOString() });
  return ApiResponse.created(res, "Drop log recorded.", { log: created, data: created });
});
