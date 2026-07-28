import { Request, Response } from "express";

export const getOverviewAnalytics = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    metrics: {
      totalStudents: 1420,
      attendanceRate: "94.8%",
      monthlyFeeCollection: "₹ 24.8 Lakhs",
      activeBuses: 14
    }
  });
};
