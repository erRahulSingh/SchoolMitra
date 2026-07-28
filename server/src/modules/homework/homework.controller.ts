import { Request, Response } from "express";

export const getHomeworkList = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    homework: [
      { id: "HW-101", title: "Physics Lab Experiment #4", class: "10-A", dueDate: "2026-07-30" }
    ]
  });
};
