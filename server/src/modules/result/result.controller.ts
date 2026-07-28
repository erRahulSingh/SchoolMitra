import { Request, Response } from "express";

export const getResults = async (req: Request, res: Response) => {
  return res.json({ success: true, results: [{ studentId: "STU-1001", exam: "Mid-Term 2026", grade: "A+", percentage: 94.2 }] });
};
