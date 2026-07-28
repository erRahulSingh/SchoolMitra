import { Request, Response } from "express";

export const generateReport = async (req: Request, res: Response) => {
  try {
    const { reportType } = req.query;

    if (!reportType) {
      return res.status(400).json({ success: false, message: "reportType parameter is required." });
    }

    let data: any = [];

    if (reportType === "Attendance") {
      data = [
        { date: "2026-08-01", present: 1380, absent: 40, rate: "97.1%" },
        { date: "2026-08-02", present: 1392, absent: 28, rate: "98.0%" },
        { date: "2026-08-03", present: 1344, absent: 76, rate: "94.6%" }
      ];
    } else if (reportType === "Fee") {
      data = [
        { quarter: "Q1 2026", collected: 2480000, target: 2500000, percentage: "99.2%" },
        { quarter: "Q2 2026", collected: 185000, target: 1200000, percentage: "15.4%" }
      ];
    } else if (reportType === "Transport") {
      data = [
        { busNo: "DL 01 AB 4321", route: "Route 1 - Dwarka", tripsCompleted: 42, kmCovered: 1840 },
        { busNo: "DL 01 AB 8899", route: "Route 2 - Vasant Kunj", tripsCompleted: 38, kmCovered: 1520 }
      ];
    } else if (reportType === "Exam") {
      data = [
        { exam: "Mid-Term", class: "10-A", averageScore: "88.4%", topScore: "98.5%" },
        { exam: "Unit Test 1", class: "10-A", averageScore: "85.2%", topScore: "96.0%" }
      ];
    } else {
      return res.status(400).json({ success: false, message: "Invalid reportType. Use Attendance, Fee, Transport, or Exam." });
    }

    return res.json({
      success: true,
      reportType,
      generatedAt: new Date().toISOString(),
      records: data
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
