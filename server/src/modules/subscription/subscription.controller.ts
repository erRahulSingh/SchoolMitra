import { Request, Response } from "express";

export const getSubscriptionPlans = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    plans: [
      { id: "plan-starter", name: "Starter", price: 9999, maxStudents: 500 },
      { id: "plan-pro", name: "Pro ERP + GPS", price: 19999, maxStudents: 1500 },
      { id: "plan-enterprise", name: "Enterprise", price: 0, maxStudents: 99999 }
    ]
  });
};
