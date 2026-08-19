// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Circular Service
// ═══════════════════════════════════════════════════════════

import { CircularModel } from "../../models/CommunicationSchemas";
import mongoose from "mongoose";

export const getPublishedCirculars = async (schoolId: string | mongoose.Types.ObjectId) => {
  return CircularModel.find({
    schoolId: new mongoose.Types.ObjectId(schoolId),
    status: "Published"
  }).sort({ createdAt: -1 }).lean();
};
