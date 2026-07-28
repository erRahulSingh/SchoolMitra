import { Request, Response } from "express";
import { SchoolModel } from "../../models/AuthSchemas";

export const getAllSchools = async (req: Request, res: Response) => {
  try {
    const schools = await SchoolModel.find().lean();
    return res.json({ success: true, count: schools.length, data: schools });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createSchool = async (req: Request, res: Response) => {
  try {
    const school = await SchoolModel.create(req.body);
    return res.status(201).json({ success: true, school });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
