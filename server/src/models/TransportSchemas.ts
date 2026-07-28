import { Schema, model } from "mongoose";

// 6. Transport Collections
export const BusModel = model("buses", new Schema({ busNumber: String, capacity: Number }, { timestamps: true }));
export const DriverModel = model("drivers", new Schema({ name: String, phone: String, licenseNo: String }, { timestamps: true }));
export const BusAttendantModel = model("busAttendants", new Schema({ name: String, phone: String }, { timestamps: true }));
export const RouteModel = model("routes", new Schema({ routeName: String, startPoint: String, endPoint: String }, { timestamps: true }));
export const StopModel = model("stops", new Schema({ stopName: String, routeId: Schema.Types.ObjectId, scheduledTime: String }, { timestamps: true }));
export const StudentRouteModel = model("studentRoutes", new Schema({ studentId: Schema.Types.ObjectId, routeId: Schema.Types.ObjectId, stopId: Schema.Types.ObjectId }, { timestamps: true }));
export const GPSLocationModel = model("gpsLocations", new Schema({ busId: Schema.Types.ObjectId, latitude: Number, longitude: Number, speed: Number }, { timestamps: true }));
export const TripModel = model("trips", new Schema({ busId: Schema.Types.ObjectId, driverId: Schema.Types.ObjectId, status: String }, { timestamps: true }));
export const TripHistoryModel = model("tripHistory", new Schema({ tripId: Schema.Types.ObjectId, distanceCovered: Number }, { timestamps: true }));
export const PickupLogModel = model("pickupLogs", new Schema({ studentId: Schema.Types.ObjectId, stopId: Schema.Types.ObjectId, time: String }, { timestamps: true }));
export const DropLogModel = model("dropLogs", new Schema({ studentId: Schema.Types.ObjectId, stopId: Schema.Types.ObjectId, time: String }, { timestamps: true }));
export const FuelLogModel = model("fuelLogs", new Schema({ busId: Schema.Types.ObjectId, liters: Number, amount: Number }, { timestamps: true }));
export const MaintenanceLogModel = model("maintenanceLogs", new Schema({ busId: Schema.Types.ObjectId, description: String, cost: Number }, { timestamps: true }));
