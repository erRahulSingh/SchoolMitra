import { Request, Response } from "express";

export const getSchools = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    total: 3,
    data: [
      { id: "sch-101", code: "DPS-DEL", name: "Delhi Public School", city: "New Delhi", plan: "Enterprise", status: "Active", studentsCount: 1420, busesCount: 14, mrr: 185000 },
      { id: "sch-102", code: "GDS-GUG", name: "GD Goenka Public School", city: "Gurugram", plan: "Pro", status: "Active", studentsCount: 980, busesCount: 10, mrr: 120000 },
      { id: "sch-103", code: "RYN-NOI", name: "Ryan International", city: "Noida", plan: "Pro", status: "Active", studentsCount: 1150, busesCount: 12, mrr: 145000 },
    ]
  });
};

export const createSchool = async (req: Request, res: Response) => {
  const { name, city, code, plan } = req.body;
  return res.status(201).json({
    success: true,
    message: "School registered successfully",
    school: { id: `sch-${Date.now()}`, code, name, city, plan, status: "Active" }
  });
};
