import { Request, Response } from "express";

export const getSupportTickets = async (req: Request, res: Response) => {
  return res.json({ success: true, tickets: [{ id: "TCK-1092", subject: "SMS Gateway Config", status: "Open" }] });
};
