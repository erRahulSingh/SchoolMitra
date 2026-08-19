// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Message Service
// ═══════════════════════════════════════════════════════════

import { ChatRoomModel, MessageModel } from "../../models/CommunicationSchemas";
import mongoose from "mongoose";

export const getConversationHistory = async (roomId: string | mongoose.Types.ObjectId) => {
  return MessageModel.find({
    roomId: new mongoose.Types.ObjectId(roomId)
  }).sort({ createdAt: 1 }).lean();
};
