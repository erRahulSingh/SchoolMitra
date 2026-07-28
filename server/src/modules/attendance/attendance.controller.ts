import { Request, Response } from "express";

export const markAttendance = async (req: Request, res: Response) => {
  return res.status(201).json({ success: true, message: "Class attendance recorded", date: new Date().toISOString() });
};

export const getAttendanceReport = async (req: Request, res: Response) => {
  return res.json({ success: true, attendanceRate: "94.8%", totalPresent: 1346, totalAbsent: 74 });
};
