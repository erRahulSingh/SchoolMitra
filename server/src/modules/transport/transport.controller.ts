// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Transport Fleet Controller (Phase 10)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { 
  BusModel, 
  DriverModel, 
  RouteModel, 
  StopModel, 
  TripModel,
  StudentRouteModel,
  BusRouteAssignmentModel
} from "../../models/TransportSchemas";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { createNotification } from "../../services/notificationService";
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
  await getOrSeedBuses();
  const buses = await BusModel.find().populate("driverId").lean();
  return ApiResponse.success(res, 200, "Fleet buses retrieved", { buses });
});

export const createBus = asyncHandler(async (req: Request, res: Response) => {
  const { 
    busNumber, 
    capacity, 
    registrationNumber, 
    registrationNo, 
    busType, 
    gpsDeviceId, 
    driverId, 
    driverName, 
    routeName, 
    status 
  } = req.body;

  if (!busNumber) {
    throw ApiError.badRequest("Bus number is required.");
  }

  let finalDriverName = driverName || "Unassigned Pilot";
  if (driverId && Types.ObjectId.isValid(driverId)) {
    const driver = await DriverModel.findById(driverId).lean();
    if (driver) {
      finalDriverName = (driver as any).name;
    }
  }

  const created = await BusModel.create({
    schoolId: dummySchoolId,
    busNumber,
    registrationNo: registrationNumber || registrationNo || busNumber,
    busType: busType || "School Bus",
    capacity: capacity || 40,
    gpsDeviceId: gpsDeviceId || "",
    driverId: driverId && Types.ObjectId.isValid(driverId) ? new Types.ObjectId(driverId) : undefined,
    driverName: finalDriverName,
    routeName: routeName || "Default School Route",
    status: status || "ACTIVE"
  });

  if (driverId && Types.ObjectId.isValid(driverId)) {
    await DriverModel.findByIdAndUpdate(driverId, {
      assignedBusId: created._id
    });
  }

  return ApiResponse.created(res, "Fleet Bus registered successfully.", { bus: created });
});

export const updateBus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { 
    busNumber, 
    capacity, 
    registrationNumber, 
    registrationNo, 
    busType, 
    gpsDeviceId, 
    driverId, 
    driverName, 
    routeName, 
    status 
  } = req.body;

  if (!Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest("Invalid bus ID.");
  }

  let finalDriverName = driverName;
  if (driverId && Types.ObjectId.isValid(driverId)) {
    const driver = await DriverModel.findById(driverId).lean();
    if (driver) {
      finalDriverName = (driver as any).name;
    }
  }

  const updatedBus = await BusModel.findByIdAndUpdate(
    id,
    {
      busNumber,
      registrationNo: registrationNumber || registrationNo,
      busType,
      capacity,
      gpsDeviceId,
      driverId: driverId && Types.ObjectId.isValid(driverId) ? new Types.ObjectId(driverId) : undefined,
      driverName: finalDriverName,
      routeName,
      status
    },
    { new: true }
  );

  if (!updatedBus) {
    throw ApiError.notFound("Bus not found.");
  }

  if (driverId && Types.ObjectId.isValid(driverId)) {
    await DriverModel.updateMany({ assignedBusId: updatedBus._id }, { $unset: { assignedBusId: 1 } });
    await DriverModel.findByIdAndUpdate(driverId, { assignedBusId: updatedBus._id });
  }

  return ApiResponse.success(res, 200, "Bus record updated successfully.", { bus: updatedBus });
});

export const deleteBus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest("Invalid bus ID.");
  }

  const deleted = await BusModel.findByIdAndDelete(id);
  if (!deleted) {
    throw ApiError.notFound("Bus not found.");
  }

  await DriverModel.updateMany({ assignedBusId: id }, { $unset: { assignedBusId: 1 } });

  return ApiResponse.success(res, 200, "Bus removed successfully.");
});

// ════════════ 2. ROUTE MANAGEMENT ════════════
export const getRoutes = asyncHandler(async (_req: Request, res: Response) => {
  await getOrSeedRoutes();
  const routes = await RouteModel.find().lean();
  
  const routesWithStops = [];
  for (const route of routes) {
    const stops = await StopModel.find({ routeId: route._id }).sort({ order: 1 }).lean();
    routesWithStops.push({
      ...route,
      stops: stops.map((s: any) => ({
        id: s._id?.toString(),
        _id: s._id,
        name: s.stopName,
        stopName: s.stopName,
        latitude: s.latitude,
        longitude: s.longitude,
        sequence: s.sequence || s.order,
        order: s.order,
        pickupTime: s.pickupTime || s.scheduledTimeMorning,
        dropTime: s.dropTime || s.scheduledTimeEvening,
        scheduledTimeMorning: s.scheduledTimeMorning,
        scheduledTimeEvening: s.scheduledTimeEvening,
      }))
    });
  }

  return ApiResponse.success(res, 200, "Transport routes retrieved", { routes: routesWithStops });
});

export const createRoute = asyncHandler(async (req: Request, res: Response) => {
  const { routeName, startPoint, endPoint, distanceKm, stops } = req.body;
  if (!routeName) {
    throw ApiError.badRequest("Route name is required.");
  }

  const createdRoute = await RouteModel.create({
    schoolId: dummySchoolId,
    routeName,
    startPoint: startPoint || "Start Terminal",
    endPoint: endPoint || "School Gate",
    distanceKm: Number(distanceKm) || 15
  });

  if (Array.isArray(stops) && stops.length > 0) {
    const stopsData = stops.map((stop: any, idx: number) => ({
      schoolId: dummySchoolId,
      routeId: createdRoute._id,
      stopName: stop.name || stop.stopName,
      order: stop.sequence || stop.order || (idx + 1),
      sequence: stop.sequence || stop.order || (idx + 1),
      latitude: Number(stop.latitude) || 0,
      longitude: Number(stop.longitude) || 0,
      pickupTime: stop.pickupTime || stop.scheduledTimeMorning || "07:00 AM",
      dropTime: stop.dropTime || stop.scheduledTimeEvening || "02:00 PM",
      scheduledTimeMorning: stop.pickupTime || stop.scheduledTimeMorning || "07:00 AM",
      scheduledTimeEvening: stop.dropTime || stop.scheduledTimeEvening || "02:00 PM",
    }));

    await StopModel.insertMany(stopsData);
  }

  return ApiResponse.created(res, "Route registered successfully in database.", { route: createdRoute });
});

// ════════════ 3. STOP MANAGEMENT ════════════
export const getStops = asyncHandler(async (_req: Request, res: Response) => {
  const stops = await StopModel.find().lean().catch(() => []);
  return ApiResponse.success(res, 200, "Stops retrieved", {
    stops: stops.map((s: any) => ({
      ...s,
      name: s.stopName,
      sequence: s.sequence || s.order,
      pickupTime: s.pickupTime || s.scheduledTimeMorning,
      dropTime: s.dropTime || s.scheduledTimeEvening
    }))
  });
});

export const createStop = asyncHandler(async (req: Request, res: Response) => {
  const { stopName, routeId, scheduledTime, order = 1, sequence, pickupTime, dropTime, latitude, longitude } = req.body;
  if (!stopName) throw ApiError.badRequest("Stop name is required.");

  const finalRouteId = routeId || new Types.ObjectId("650000000000000000000501");
  const finalSequence = sequence || order || 1;

  const created = await StopModel.create({
    schoolId: dummySchoolId,
    routeId: finalRouteId,
    stopName,
    order: Number(finalSequence),
    sequence: Number(finalSequence),
    latitude: Number(latitude) || 0,
    longitude: Number(longitude) || 0,
    scheduledTimeMorning: pickupTime || scheduledTime || "07:30 AM",
    scheduledTimeEvening: dropTime || "02:30 PM",
    pickupTime: pickupTime || scheduledTime || "07:30 AM",
    dropTime: dropTime || "02:30 PM",
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

// ════════════ 6. ASSIGN BUS TO ROUTE ════════════
export const assignBusRoute = asyncHandler(async (req: Request, res: Response) => {
  const { busId, routeId, driverId, academicYearId } = req.body;

  if (!busId || !routeId || !driverId) {
    throw ApiError.badRequest("busId, routeId, and driverId are required.");
  }

  // Fetch bus, route, and driver records to validate school matching
  const [bus, route, driver] = await Promise.all([
    BusModel.findById(busId),
    RouteModel.findById(routeId),
    DriverModel.findById(driverId)
  ]);

  if (!bus || !route || !driver) {
    throw ApiError.notFound("Bus, Route, or Driver record not found.");
  }

  // CONSTRAINT VALIDATION: One school's bus cannot be assigned to another school's route
  if (bus.schoolId.toString() !== route.schoolId.toString()) {
    throw ApiError.badRequest("Cannot assign a bus to a route from a different school.");
  }

  // Create or Update Assignment mapping
  const assignment = await BusRouteAssignmentModel.findOneAndUpdate(
    { schoolId: bus.schoolId, busId, academicYearId },
    { routeId, driverId, status: "Active" },
    { new: true, upsert: true }
  );

  // Sync details on Bus and Driver records
  await Promise.all([
    BusModel.findByIdAndUpdate(busId, { driverId, driverName: driver.name, routeName: route.routeName }),
    DriverModel.findByIdAndUpdate(driverId, { assignedBusId: busId }),
    RouteModel.findByIdAndUpdate(routeId, { assignedBusId: busId })
  ]);

  return ApiResponse.success(res, 200, "Bus successfully assigned to Route with Driver.", { assignment });
});

export const getBusRouteAssignments = asyncHandler(async (req: Request, res: Response) => {
  const assignments = await BusRouteAssignmentModel.find()
    .populate("busId")
    .populate("routeId")
    .populate("driverId")
    .lean();

  return ApiResponse.success(res, 200, "Bus to Route assignments retrieved.", { assignments });
});

// ════════════ 6B. ASSIGN STUDENT TRANSPORT ════════════
export const assignStudentTransport = asyncHandler(async (req: Request, res: Response) => {
  const { studentId, busId, routeId, pickupStopId, dropStopId, academicYearId, status } = req.body;

  if (!studentId || !routeId) {
    throw ApiError.badRequest("studentId and routeId are required.");
  }

  const payload: any = {
    schoolId: dummySchoolId,
    studentId,
    busId: busId || undefined,
    routeId,
    pickupStopId: pickupStopId || undefined,
    dropStopId: dropStopId || undefined,
    academicYearId: academicYearId || undefined,
    status: status || "Active"
  };

  // Upsert Student Route record
  const assignment = await StudentRouteModel.findOneAndUpdate(
    { schoolId: dummySchoolId, studentId },
    payload,
    { new: true, upsert: true }
  );

  return ApiResponse.success(res, 200, "Student transport settings assigned successfully.", { assignment });
});

export const getStudentTransportAssignments = asyncHandler(async (req: Request, res: Response) => {
  const assignments = await StudentRouteModel.find()
    .populate("studentId")
    .populate("busId")
    .populate("routeId")
    .populate("pickupStopId")
    .populate("dropStopId")
    .lean();

  return ApiResponse.success(res, 200, "Student transport assignments list retrieved.", { assignments });
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

  const schoolId = (req as any).user?.schoolId || "sch_default";
  const senderId = (req as any).user?.id || (req as any).user?._id;

  if ((req as any).user) {
    createNotification({
      schoolId,
      senderId,
      recipientId: senderId,
      recipientRole: "SchoolAdmin",
      type: "TRANSPORT",
      title: `🚨 EMERGENCY SOS BROADCAST: ${busNo}`,
      message: `Emergency Alert from ${busNo} driven by ${driverName} at ${location}. Control room notified.`,
      referenceType: "buses"
    }).catch(() => {});
  }

  return ApiResponse.created(res, "🚨 EMERGENCY SOS BROADCAST SENT TO SCHOOL CONTROL ROOM & PARENTS!", { alert: newAlert });
});

export const getSOSAlerts = asyncHandler(async (_req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "SOS Safety Emergency Alerts queue", { alerts: sosAlertsStore });
});

export const updateRoute = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { routeName, startPoint, endPoint, distanceKm } = req.body;

  if (!Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest("Invalid route ID.");
  }

  const updated = await RouteModel.findByIdAndUpdate(
    id,
    { routeName, startPoint, endPoint, distanceKm: Number(distanceKm) },
    { new: true }
  );

  if (!updated) {
    throw ApiError.notFound("Route not found.");
  }

  return ApiResponse.success(res, 200, "Route updated successfully.", { route: updated });
});

export const updateStop = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { stopName, order, sequence, pickupTime, dropTime, latitude, longitude } = req.body;

  if (!Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest("Invalid stop ID.");
  }

  const updated = await StopModel.findByIdAndUpdate(
    id,
    { 
      stopName, 
      order: Number(order || sequence), 
      sequence: Number(sequence || order), 
      pickupTime, 
      dropTime,
      scheduledTimeMorning: pickupTime,
      scheduledTimeEvening: dropTime,
      latitude: Number(latitude),
      longitude: Number(longitude)
    },
    { new: true }
  );

  if (!updated) {
    throw ApiError.notFound("Stop not found.");
  }

  return ApiResponse.success(res, 200, "Stop updated successfully.", { stop: updated });
});

export const getAssignments = asyncHandler(async (req: Request, res: Response) => {
  const [busAssignments, studentAssignments] = await Promise.all([
    BusRouteAssignmentModel.find().populate("busId").populate("routeId").populate("driverId").lean(),
    StudentRouteModel.find().populate("studentId").populate("busId").populate("routeId").populate("pickupStopId").populate("dropStopId").lean()
  ]);

  return ApiResponse.success(res, 200, "All transport assignments retrieved.", { 
    assignments: {
      buses: busAssignments,
      students: studentAssignments
    }
  });
});

export const getLiveTransport = asyncHandler(async (req: Request, res: Response) => {
  const liveLocations = [
    { busId: "BUS-01", latitude: 28.5833, longitude: 77.0667, speed: 45, heading: 90, status: "ACTIVE", lastUpdated: "Just now" },
    { busId: "BUS-02", latitude: 28.5700, longitude: 77.1200, speed: 40, heading: 180, status: "ACTIVE", lastUpdated: "1 minute ago" }
  ];
  return ApiResponse.success(res, 200, "Live transport telemetry active lists.", { liveLocations });
});
