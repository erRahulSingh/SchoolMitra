import { Request, Response } from "express";

export const getLiveBuses = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    buses: [
      {
        id: "BUS-01",
        busNumber: "DL 01 AB 4321",
        driverName: "Ram Singh",
        driverPhone: "+91 98111 22334",
        route: "Route 1 - Dwarka Sector 12",
        status: "On Route",
        currentStop: "Stop 4: Sector 10 Metro Gate",
        eta: "07:45 AM (8 mins away)",
        speed: "34 km/h",
        coordinates: { latitude: 28.5921, longitude: 77.0460 }
      },
      {
        id: "BUS-02",
        busNumber: "DL 01 AB 8899",
        driverName: "Sukhwinder Kumar",
        driverPhone: "+91 98222 33445",
        route: "Route 2 - Vasant Kunj & Saket",
        status: "On Route",
        currentStop: "Stop 2: Fortis Hospital Crossing",
        eta: "07:52 AM (15 mins away)",
        speed: "28 km/h",
        coordinates: { latitude: 28.5244, longitude: 77.1588 }
      }
    ]
  });
};
