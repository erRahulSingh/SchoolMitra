// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Announcement Service
// ═══════════════════════════════════════════════════════════

import { AnnouncementModel } from "../../models/CommunicationSchemas";
import mongoose from "mongoose";

export const getAnnouncementsForSchool = async (schoolId: string | mongoose.Types.ObjectId) => {
  return AnnouncementModel.find({
    schoolId: new mongoose.Types.ObjectId(schoolId),
    status: "Published"
  }).sort({ createdAt: -1 }).lean();
};
