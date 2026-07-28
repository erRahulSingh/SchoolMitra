import { Request, Response } from "express";
import { StudentModel } from "../../models/Student";

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await StudentModel.find().lean();
    
    // Fallback standard list for frontend compatibility
    const fallback = [
      { id: "STU-1001", rollNo: "10-A-01", name: "Aarav Sharma", class: "10", section: "A", parentName: "Rajesh Sharma", phone: "+91 98765 43210", attendance: "96%", feeStatus: "Paid" },
      { id: "STU-1002", rollNo: "10-A-02", name: "Ananya Patel", class: "10", section: "A", parentName: "Suresh Patel", phone: "+91 98123 45678", attendance: "92%", feeStatus: "Pending" }
    ];

    const result = students.length > 0 ? students : fallback;
    return res.json({ success: true, count: result.length, data: result, students: result });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await StudentModel.create(req.body);
    return res.status(201).json({ success: true, message: "Student enrolled successfully.", student });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
