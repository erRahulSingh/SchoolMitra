import { Request, Response } from "express";

export const getStudents = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    students: [
      { id: "STU-1001", rollNo: "10-A-01", name: "Aarav Sharma", class: "10", section: "A", parentName: "Rajesh Sharma", phone: "+91 98765 43210", attendance: "96%", feeStatus: "Paid" },
      { id: "STU-1002", rollNo: "10-A-02", name: "Ananya Patel", class: "10", section: "A", parentName: "Suresh Patel", phone: "+91 98123 45678", attendance: "92%", feeStatus: "Pending" }
    ]
  });
};

export const createStudent = async (req: Request, res: Response) => {
  return res.status(201).json({ success: true, message: "Student enrolled successfully", student: { id: `STU-${Date.now()}`, ...req.body } });
};
