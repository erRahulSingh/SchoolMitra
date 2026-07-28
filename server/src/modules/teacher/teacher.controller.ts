import { Request, Response } from "express";

export const getTeachers = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    teachers: [
      { id: "TCH-01", name: "Sunita Mehta", subject: "Physics", salary: "₹ 55,000" },
      { id: "TCH-02", name: "Vikram Malhotra", subject: "Mathematics", salary: "₹ 58,000" }
    ]
  });
};
