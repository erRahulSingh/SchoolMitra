import { Request, Response } from "express";

export const getOverviewAnalytics = async (req: Request, res: Response) => {
  try {
    const revenueAnalytics = [
      { month: "May", amount: 1850000 },
      { month: "June", amount: 2200000 },
      { month: "July", amount: 2480000 }
    ];

    const studentAnalytics = [
      { grade: "Class 8", count: 240 },
      { grade: "Class 9", count: 280 },
      { grade: "Class 10", count: 320 }
    ];

    const attendanceAnalytics = [
      { day: "Mon", rate: 96.2 },
      { day: "Tue", rate: 97.4 },
      { day: "Wed", rate: 95.8 },
      { day: "Thu", rate: 94.6 },
      { day: "Fri", rate: 96.0 }
    ];

    const busStatusAnalytics = [
      { busNo: "DL 01 AB 4321", active: true, passengers: 34 },
      { busNo: "DL 01 AB 8899", active: true, passengers: 28 }
    ];

    return res.json({
      success: true,
      metrics: {
        totalStudents: 1420,
        attendanceRate: "94.8%",
        monthlyFeeCollection: "₹ 24.8 Lakhs",
        activeBuses: 14
      },
      charts: {
        revenue: revenueAnalytics,
        students: studentAnalytics,
        attendance: attendanceAnalytics,
        buses: busStatusAnalytics
      }
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
