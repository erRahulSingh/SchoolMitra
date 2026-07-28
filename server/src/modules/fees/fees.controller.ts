import { Request, Response } from "express";

export const getInvoices = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    invoices: [
      { id: "INV-2026-081", studentName: "Aarav Sharma", amount: 18500, dueDate: "2026-08-10", status: "Paid" },
      { id: "INV-2026-082", studentName: "Ananya Patel", amount: 18500, dueDate: "2026-08-10", status: "Pending" }
    ]
  });
};
