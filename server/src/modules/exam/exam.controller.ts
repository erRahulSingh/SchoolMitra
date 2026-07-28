import { Request, Response } from "express";

export const getExamSchedules = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    exams: [
      { id: "EXM-01", title: "Mid-Term Science Exam", class: "10-A", date: "2026-08-14", totalMarks: 100 }
    ]
  });
};
