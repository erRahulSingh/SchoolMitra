import { Request, Response } from "express";

export const getLiveGpsTelemetry = async (req: Request, res: Response) => {
  return res.json({ success: true, busId: "BUS-01", speed: "34 km/h", coordinates: { latitude: 28.5921, longitude: 77.0460 } });
};
