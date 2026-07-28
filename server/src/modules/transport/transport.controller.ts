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

// ════════════ 1. BUS MANAGEMENT ════════════
export const getBuses = async (req: Request, res: Response) => {
  try {
    const data = await BusModel.find().lean();
    return res.json({ success: true, count: data.length, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createBus = async (req: Request, res: Response) => {
  try {
    const { busNumber, capacity } = req.body;
    if (!busNumber) return res.status(400).json({ success: false, message: "Bus number is required." });

    const created = await BusModel.create({ busNumber, capacity });
    return res.json({ success: true, message: "Bus registered successfully.", data: created });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ════════════ 2. DRIVER MANAGEMENT ════════════
export const getDrivers = async (req: Request, res: Response) => {
  try {
    const data = await DriverModel.find().lean();
    return res.json({ success: true, count: data.length, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createDriver = async (req: Request, res: Response) => {
  try {
    const { name, phone, licenseNo } = req.body;
    if (!name || !phone) return res.status(400).json({ success: false, message: "Driver name and phone are required." });

    const created = await DriverModel.create({ name, phone, licenseNo });
    return res.json({ success: true, message: "Driver registered successfully.", data: created });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ════════════ 3. ROUTE MANAGEMENT ════════════
export const getRoutes = async (req: Request, res: Response) => {
  try {
    const data = await RouteModel.find().lean();
    return res.json({ success: true, count: data.length, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createRoute = async (req: Request, res: Response) => {
  try {
    const { routeName, startPoint, endPoint } = req.body;
    if (!routeName) return res.status(400).json({ success: false, message: "Route name is required." });

    const created = await RouteModel.create({ routeName, startPoint, endPoint });
    return res.json({ success: true, message: "Route registered successfully.", data: created });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ════════════ 4. STOP MANAGEMENT ════════════
export const getStops = async (req: Request, res: Response) => {
  try {
    const data = await StopModel.find().lean();
    return res.json({ success: true, count: data.length, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createStop = async (req: Request, res: Response) => {
  try {
    const { stopName, routeId, scheduledTime } = req.body;
    if (!stopName || !routeId) return res.status(400).json({ success: false, message: "Stop name and route id are required." });

    const created = await StopModel.create({ stopName, routeId, scheduledTime });
    return res.json({ success: true, message: "Stop registered successfully.", data: created });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ════════════ 5. TRIP MANAGEMENT ════════════
export const getTrips = async (req: Request, res: Response) => {
  try {
    const data = await TripModel.find().lean();
    return res.json({ success: true, count: data.length, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createTrip = async (req: Request, res: Response) => {
  try {
    const { busId, driverId, status } = req.body;
    const created = await TripModel.create({ busId, driverId, status: status || "Scheduled" });
    return res.json({ success: true, message: "Trip logged successfully.", data: created });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ════════════ 6. PICKUP LOGS ════════════
export const getPickupLogs = async (req: Request, res: Response) => {
  try {
    const data = await PickupLogModel.find().lean();
    return res.json({ success: true, count: data.length, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createPickupLog = async (req: Request, res: Response) => {
  try {
    const { studentId, stopId, time } = req.body;
    const created = await PickupLogModel.create({ studentId, stopId, time: time || new Date().toISOString() });
    return res.json({ success: true, message: "Pickup log recorded.", data: created });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ════════════ 7. DROP LOGS ════════════
export const getDropLogs = async (req: Request, res: Response) => {
  try {
    const data = await DropLogModel.find().lean();
    return res.json({ success: true, count: data.length, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createDropLog = async (req: Request, res: Response) => {
  try {
    const { studentId, stopId, time } = req.body;
    const created = await DropLogModel.create({ studentId, stopId, time: time || new Date().toISOString() });
    return res.json({ success: true, message: "Drop log recorded.", data: created });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
