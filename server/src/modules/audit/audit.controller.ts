import { Request, Response } from "express";

export const getAuditLogs = async (req: Request, res: Response) => {
  return res.json({ success: true, logs: [{ action: "User Role Update", user: "Admin", timestamp: new Date().toISOString() }] });
};
