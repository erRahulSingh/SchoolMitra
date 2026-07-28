import { Request, Response } from "express";

export const getAssignments = async (req: Request, res: Response) => {
  return res.json({ success: true, assignments: [{ id: "ASG-01", title: "Quadratic Equations", maxMarks: 50 }] });
};
