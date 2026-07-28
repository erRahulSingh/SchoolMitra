import { Request, Response } from "express";
import { AuditLogModel } from "../../models/SystemSchemas";

export const getAuditLogs = async (req: Request, res: Response) => {
  try {
    const logs = await AuditLogModel.find().sort({ createdAt: -1 }).limit(100).lean();
    return res.json({
      success: true,
      logs: logs.map(l => ({
        id: l._id,
        action: l.action || "System Config Access",
        user: l.userId || "System System",
        ip: l.ip || "127.0.0.1",
        timestamp: l.createdAt
      }))
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
