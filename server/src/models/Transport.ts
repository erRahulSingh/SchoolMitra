import { Schema, model } from "mongoose";

const BusSchema = new Schema(
  {
    busNumber: { type: String, required: true, unique: true },
    driverName: { type: String, required: true },
    driverPhone: { type: String, required: true },
    route: { type: String, required: true },
    studentsCount: { type: Number, default: 0 },
    status: { type: String, enum: ['On Route', 'At School', 'Delayed', 'Completed'], default: 'On Route' },
    currentStop: { type: String, default: 'Starting Route' },
    eta: { type: String, default: 'On Time' },
    speed: { type: String, default: '0 km/h' },
    coordinates: {
      latitude: { type: Number, default: 28.5921 },
      longitude: { type: Number, default: 77.0460 },
    }
  },
  { timestamps: true }
);

export const BusModel = model("Bus", BusSchema);
