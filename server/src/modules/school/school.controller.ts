import { Request, Response } from "express";
import { SchoolModel } from "../../models/AuthSchemas";

export const getAllSchools = async (req: Request, res: Response) => {
  const schools = await SchoolModel.find().lean();
  return res.json({ success: true, count: schools.length, data: schools });
};

export const createSchool = async (req: Request, res: Response) => {
  const school = await SchoolModel.create(req.body);
  return res.status(201).json({ success: true, school });
};
