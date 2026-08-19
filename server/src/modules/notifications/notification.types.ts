// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Notification Types
// ═══════════════════════════════════════════════════════════

import mongoose from "mongoose";

export type NotificationType = 
  | "HOMEWORK" 
  | "EXAM" 
  | "RESULT" 
  | "REPORT_CARD" 
  | "FEE" 
  | "TRANSPORT" 
  | "ANNOUNCEMENT" 
  | "MESSAGE"
  | "Attendance"
  | "Emergency"
  | "System";

export interface CreateNotificationDto {
  schoolId: mongoose.Types.ObjectId | string;
  senderId?: mongoose.Types.ObjectId | string;
  recipientId: mongoose.Types.ObjectId | string;
  recipientRole?: "Parent" | "Teacher" | "SchoolAdmin" | "Driver" | "SuperAdmin";
  type: NotificationType;
  title: string;
  message: string;
  referenceType?: string;
  referenceId?: mongoose.Types.ObjectId | string;
  actionUrl?: string;
}

export interface SendNotificationPayload {
  schoolId?: mongoose.Types.ObjectId | string;
  senderId?: mongoose.Types.ObjectId | string;
  recipientId: mongoose.Types.ObjectId | string;
  recipientRole?: "Parent" | "Teacher" | "SchoolAdmin" | "Driver" | "SuperAdmin";
  type: NotificationType | string;
  title: string;
  message: string;
  referenceType?: string;
  referenceId?: mongoose.Types.ObjectId | string;
  actionUrl?: string;
}
