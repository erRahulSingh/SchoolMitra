import { Request, Response } from "express";

export const generateReport = async (req: Request, res: Response) => {
  return res.json({ success: true, reportType: "Financial Collection Report", generatedAt: new Date().toISOString() });
};
