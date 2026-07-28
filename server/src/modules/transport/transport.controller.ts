import { Request, Response } from "express";

export const getLiveBusLocations = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    buses: [
      { id: "BUS-01", busNumber: "DL 01 AB 4321", driverName: "Ram Singh", route: "Route 1 - Dwarka", status: "On Route", speed: "34 km/h", coordinates: { latitude: 28.5921, longitude: 77.0460 } },
      { id: "BUS-02", busNumber: "DL 01 AB 8899", driverName: "Sukhwinder Kumar", route: "Route 2 - Vasant Kunj", status: "On Route", speed: "28 km/h", coordinates: { latitude: 28.5244, longitude: 77.1588 } }
    ]
  });
};
