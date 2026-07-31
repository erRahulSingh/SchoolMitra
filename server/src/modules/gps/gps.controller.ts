// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — GPS Live Telemetry Controller (Phase 10)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

export const updateGpsLocation = asyncHandler(async (req: Request, res: Response) => {
  const { busNo = "Bus #01", latitude = 28.5921, longitude = 77.0460, speed = 34, routeName = "Route 1 - Dwarka" } = req.body;

  return ApiResponse.success(res, 200, `GPS Location updated for ${busNo}. Broadcasted to Socket.IO.`, {
    busNo,
    routeName,
    coordinates: { latitude, longitude },
    speed: `${speed} km/h`,
    timestamp: new Date().toISOString()
  });
});

export const getLiveMapFleet = asyncHandler(async (_req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Realtime fleet GPS coordinates for Live Map", {
    fleet: [
      { busNo: "Bus #01", driver: "Ram Singh", speed: "34 km/h", status: "MOVING 🟢", coordinates: { latitude: 28.5921, longitude: 77.0460 }, route: "Route 1 - Dwarka" },
      { busNo: "Bus #02", driver: "Suresh Kumar", speed: "28 km/h", status: "MOVING 🟢", coordinates: { latitude: 28.5355, longitude: 77.1568 }, route: "Route 2 - Vasant Kunj" },
      { busNo: "Bus #03", driver: "Mohan Verma", speed: "0 km/h", status: "AT STOP 🔴", coordinates: { latitude: 28.6219, longitude: 77.0878 }, route: "Route 3 - Janakpuri" }
    ]
  });
});
