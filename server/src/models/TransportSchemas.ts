import { Schema, model, models } from "mongoose";

// ──────────── 31. BUSES ────────────
const busSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  busNumber: {
    type: String,
    required: [true, "Bus number is required"],
    trim: true,
  },
  registrationNo: { type: String, trim: true, uppercase: true },
  busType: {
    type: String,
    enum: ["School Bus", "Mini Bus", "Van", "SUV", "Other"],
    default: "School Bus",
  },
  capacity: { type: Number, required: true, default: 30 },
  gpsDeviceId: { type: String, trim: true, index: true },
  driverId: {
    type: Schema.Types.ObjectId,
    ref: "drivers",
    index: true,
  },
  driverName: { type: String, trim: true },
  routeName: { type: String, trim: true },
  model: { type: String, trim: true },
  chassisNo: { type: String, trim: true },
  engineNo: { type: String, trim: true },
  fuelType: {
    type: String,
    enum: ["Diesel", "CNG", "Electric", "Petrol"],
    default: "Diesel",
  },
  insuranceExpiry: { type: Date },
  fitnessExpiry: { type: Date },
  permitExpiry: { type: Date },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE", "MAINTENANCE", "Active", "Maintenance", "Inactive", "Decommissioned"],
    default: "ACTIVE",
  },
}, { timestamps: true });

busSchema.index({ schoolId: 1, busNumber: 1 }, { unique: true });
export const BusModel = models.buses || model("buses", busSchema);

// ──────────── 32. DRIVERS ────────────
const driverSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    index: true,
  },
  name: { type: String, required: true, trim: true },
  empId: { type: String, trim: true, index: true },
  phone: { type: String, required: true, trim: true },
  licenseNo: { type: String, required: true, trim: true, uppercase: true },
  licenseExpiry: { type: Date },
  assignedBusId: {
    type: Schema.Types.ObjectId,
    ref: "buses",
    index: true,
  },
  address: { type: String, trim: true },
  emergencyContact: { type: String, trim: true },
  bloodGroup: { type: String, trim: true },
  photoUrl: { type: String },
  status: {
    type: String,
    enum: ["ACTIVE", "ON_DUTY", "OFF_DUTY", "LEAVE", "SUSPENDED", "Active", "On Duty", "Off Duty", "On Leave", "Inactive"],
    default: "ACTIVE",
    index: true,
  },
}, { timestamps: true });

driverSchema.index({ schoolId: 1, phone: 1 });
driverSchema.index({ schoolId: 1, licenseNo: 1 });
export const DriverModel = models.drivers || model("drivers", driverSchema);

// ──────────── 33. BUS ATTENDANTS ────────────
const busAttendantSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  aadharNo: { type: String, trim: true },
  assignedBusId: { type: Schema.Types.ObjectId, ref: "buses" },
  status: {
    type: String,
    enum: ["Active", "Inactive", "On Duty"],
    default: "Active",
  },
}, { timestamps: true });

busAttendantSchema.index({ schoolId: 1, phone: 1 });
export const BusAttendantModel = models.busAttendants || model("busAttendants", busAttendantSchema);

// ──────────── 34. ROUTES ────────────
const routeSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  routeName: {
    type: String,
    required: [true, "Route name is required"],
    trim: true,
  },
  routeCode: { type: String, trim: true, uppercase: true },
  startLocation: { type: String, required: true, trim: true },
  endLocation: { type: String, required: true, trim: true },
  totalDistanceKm: { type: Number, default: 0 },
  estimatedDurationMins: { type: Number, default: 0 },
  pickupTime: { type: String, trim: true },
  dropTime: { type: String, trim: true },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
}, { timestamps: true });

routeSchema.index({ schoolId: 1, routeName: 1 });
export const RouteModel = models.routes || model("routes", routeSchema);

// ──────────── 35. STOPS ────────────
const stopSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  routeId: {
    type: Schema.Types.ObjectId,
    ref: "routes",
    required: true,
    index: true,
  },
  stopName: { type: String, required: true, trim: true },
  stopSequence: { type: Number, required: true },
  landmark: { type: String, trim: true },
  latitude: { type: Number },
  longitude: { type: Number },
  pickupTime: { type: String, trim: true },
  dropTime: { type: String, trim: true },
  monthlyFare: { type: Number, default: 0 },
}, { timestamps: true });

stopSchema.index({ routeId: 1, stopSequence: 1 });
export const StopModel = models.stops || model("stops", stopSchema);

// ──────────── 36. STUDENT ROUTE ASSIGNMENTS ────────────
const studentRouteSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "students",
    required: true,
    index: true,
  },
  pickupTime: { type: String },
  dropTime: { type: String },
  academicYearId: {
    type: Schema.Types.ObjectId,
    ref: "academicYears",
  },
  status: {
    type: String,
    enum: ["Active", "Suspended", "Cancelled"],
    default: "Active",
  },
}, { timestamps: true });

studentRouteSchema.index({ schoolId: 1, studentId: 1 }, { unique: true });
export const StudentRouteModel = models.studentRoutes || model("studentRoutes", studentRouteSchema);

// ──────────── 36B. BUS ROUTE ASSIGNMENTS ────────────
const busRouteAssignmentSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  busId: {
    type: Schema.Types.ObjectId,
    ref: "buses",
    required: true,
    index: true,
  },
  routeId: {
    type: Schema.Types.ObjectId,
    ref: "routes",
    required: true,
    index: true,
  },
  driverId: {
    type: Schema.Types.ObjectId,
    ref: "drivers",
    required: true,
  },
  academicYearId: {
    type: Schema.Types.ObjectId,
    ref: "academicYears",
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
}, { timestamps: true });

busRouteAssignmentSchema.index({ schoolId: 1, busId: 1, routeId: 1, academicYearId: 1 }, { unique: true });
export const BusRouteAssignmentModel = model("busRouteAssignments", busRouteAssignmentSchema);

// ──────────── 37. REAL-TIME GPS TELEMETRY ────────────
const gpsLocationSchema = new Schema({
  busId: {
    type: Schema.Types.ObjectId,
    ref: "buses",
    required: true,
    index: true,
  },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  speed: { type: Number, default: 0 },
  heading: { type: Number, default: 0 },
  ignition: { type: Boolean, default: true },
  timestamp: {
    type: Date,
    default: Date.now,
    index: { expires: 86400 }, // 24 hours TTL auto-cleanup
  },
}, { timestamps: true });

gpsLocationSchema.index({ busId: 1, timestamp: -1 });
export const GPSLocationModel = model("gpsLocations", gpsLocationSchema);

// ──────────── 38. TRIPS ────────────
const tripSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  busId: {
    type: Schema.Types.ObjectId,
    ref: "buses",
    required: true,
    index: true,
  },
  driverId: {
    type: Schema.Types.ObjectId,
    ref: "drivers",
    required: true,
  },
  routeId: {
    type: Schema.Types.ObjectId,
    ref: "routes",
    required: true,
  },
  tripType: {
    type: String,
    enum: ["Pickup", "Drop", "Special"],
    default: "Pickup",
  },
  status: {
    type: String,
    enum: ["Scheduled", "InProgress", "Completed", "Cancelled", "Delayed"],
    default: "Scheduled",
    index: true,
  },
  startTime: { type: Date },
  endTime: { type: Date },
}, { timestamps: true });

tripSchema.index({ schoolId: 1, busId: 1, status: 1 });
export const TripModel = model("trips", tripSchema);

// ──────────── 39. TRIP HISTORY ────────────
const tripHistorySchema = new Schema({
  tripId: {
    type: Schema.Types.ObjectId,
    ref: "trips",
    required: true,
    unique: true,
    index: true,
  },
  distanceCoveredKm: { type: Number, default: 0 },
  maxSpeedKmh: { type: Number, default: 0 },
  avgSpeedKmh: { type: Number, default: 0 },
  studentsBoardedCount: { type: Number, default: 0 },
  studentsDroppedCount: { type: Number, default: 0 },
  routePath: [{
    latitude: { type: Number },
    longitude: { type: Number },
    timestamp: { type: Date },
  }],
}, { timestamps: true });

export const TripHistoryModel = model("tripHistory", tripHistorySchema);

// ──────────── 40. PICKUP LOGS ────────────
const pickupLogSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  tripId: {
    type: Schema.Types.ObjectId,
    ref: "trips",
    required: true,
    index: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "students",
    required: true,
    index: true,
  },
  stopId: {
    type: Schema.Types.ObjectId,
    ref: "stops",
    required: true,
  },
  time: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Boarded", "Absent", "Skipped"],
    default: "Boarded",
  },
  verifiedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
}, { timestamps: true });

pickupLogSchema.index({ schoolId: 1, tripId: 1 });
export const PickupLogModel = model("pickupLogs", pickupLogSchema);

// ──────────── 41. DROP LOGS ────────────
const dropLogSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  tripId: {
    type: Schema.Types.ObjectId,
    ref: "trips",
    required: true,
    index: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "students",
    required: true,
    index: true,
  },
  stopId: {
    type: Schema.Types.ObjectId,
    ref: "stops",
    required: true,
  },
  time: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Dropped", "Absent", "HandedToParent"],
    default: "Dropped",
  },
  verifiedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
}, { timestamps: true });

dropLogSchema.index({ schoolId: 1, tripId: 1 });
export const DropLogModel = model("dropLogs", dropLogSchema);

// ──────────── 42. FUEL LOGS ────────────
const fuelLogSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  busId: {
    type: Schema.Types.ObjectId,
    ref: "buses",
    required: true,
    index: true,
  },
  liters: { type: Number, required: true },
  amount: { type: Number, required: true },
  odometerReading: { type: Number, required: true },
  fuelStation: { type: String, trim: true },
  date: { type: Date, default: Date.now },
  receiptImage: { type: String },
  loggedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
}, { timestamps: true });

fuelLogSchema.index({ schoolId: 1, busId: 1, date: -1 });
export const FuelLogModel = model("fuelLogs", fuelLogSchema);

// ──────────── 43. MAINTENANCE LOGS ────────────
const maintenanceLogSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  busId: {
    type: Schema.Types.ObjectId,
    ref: "buses",
    required: true,
    index: true,
  },
  type: {
    type: String,
    enum: ["Routine", "Repair", "Inspection", "Tyre", "Engine", "Bodywork"],
    default: "Routine",
  },
  description: { type: String, required: true, trim: true },
  cost: { type: Number, required: true },
  workshopName: { type: String, trim: true },
  date: { type: Date, default: Date.now },
  nextDueDate: { type: Date },
  invoiceImage: { type: String },
  status: {
    type: String,
    enum: ["Scheduled", "InProgress", "Completed"],
    default: "Completed",
  },
}, { timestamps: true });

maintenanceLogSchema.index({ schoolId: 1, busId: 1 });
export const MaintenanceLogModel = model("maintenanceLogs", maintenanceLogSchema);



