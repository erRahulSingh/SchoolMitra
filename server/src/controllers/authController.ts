import { Request, Response } from "express";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  // Mock JWT Token response for zero-blocker development
  return res.json({
    success: true,
    message: "Login successful",
    token: "mock-jwt-token-schoolmitra-2026",
    user: {
      id: "usr-9901",
      name: email?.split("@")[0] || "School Admin",
      email: email || "admin@dps.edu.in",
      role: role || "SchoolAdmin",
      schoolId: "sch-101",
    }
  });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    user: {
      id: "usr-9901",
      name: "Principal Office",
      email: "principal@dps.edu.in",
      role: "SchoolAdmin",
      schoolName: "Delhi Public School",
    }
  });
};
