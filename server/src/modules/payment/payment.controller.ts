import { Request, Response } from "express";

export const processPayment = async (req: Request, res: Response) => {
  return res.json({ success: true, message: "Payment processed via Razorpay UPI", txnId: `TXN-${Date.now()}` });
};
