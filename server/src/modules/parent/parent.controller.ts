import { Request, Response } from "express";

export const getParentProfile = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    parent: {
      id: "PAR-501",
      name: "Rajesh Sharma",
      phone: "+91 98765 43210",
      children: [
        { id: "STU-1001", name: "Aarav Sharma", class: "10-A", school: "Delhi Public School" }
      ]
    }
  });
};
