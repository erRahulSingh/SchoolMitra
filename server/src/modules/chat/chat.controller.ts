import { Request, Response } from "express";

export const getChatMessages = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    messages: [
      { id: "msg-01", sender: "Teacher Sunita Mehta", text: "Aarav performed exceptionally well in yesterday's Physics lab assignment!", timestamp: "09:30 AM" }
    ]
  });
};
