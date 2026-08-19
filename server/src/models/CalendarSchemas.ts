// ═══════════════════════════════════════════════════════════
// SchoolMitra — Module 10: Calendar, Events & Leave Collections (5)
// ═══════════════════════════════════════════════════════════

import { Schema, model, models } from "mongoose";

// ──────────── 1. SCHOOL CALENDARS (Master Calendar per Academic Year) ────────────
const schoolCalendarSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  academicYearId: {
    type: Schema.Types.ObjectId,
    ref: "academicYears",
    index: true,
  },
  calendarName: {
    type: String,
    required: [true, "Calendar name is required"],
    trim: true,
    maxlength: 120,
  },
  description: { type: String, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true, index: true },
}, { timestamps: true });

schoolCalendarSchema.index({ schoolId: 1, academicYearId: 1 }, { unique: true });
export const SchoolCalendarModel = models.schoolCalendars || model("schoolCalendars", schoolCalendarSchema);

// ──────────── 2. SCHOOL HOLIDAYS ────────────
const schoolHolidaySchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  calendarId: {
    type: Schema.Types.ObjectId,
    ref: "schoolCalendars",
    index: true,
  },
  name: {
    type: String,
    required: [true, "Holiday name is required"],
    trim: true,
    maxlength: 120,
  },
  date: { type: Date, required: true },
  endDate: { type: Date }, // For multi-day holidays (e.g., Diwali break)
  holidayType: {
    type: String,
    enum: ["National", "State", "School", "Religious", "Custom"],
    default: "School",
    index: true,
  },
  description: { type: String, trim: true },
  isRecurringAnnually: { type: Boolean, default: false },
  applicableTo: {
    type: String,
    enum: ["All", "Students", "Teachers", "Staff"],
    default: "All",
  },
}, { timestamps: true });

schoolHolidaySchema.index({ schoolId: 1, date: 1 });
schoolHolidaySchema.index({ schoolId: 1, holidayType: 1 });
export const SchoolHolidayModel = models.schoolHolidays || model("schoolHolidays", schoolHolidaySchema);

// ──────────── 3. SCHOOL EVENTS ────────────
const schoolEventSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: [true, "Event title is required"],
    trim: true,
    maxlength: 200,
  },
  description: { type: String, trim: true },
  eventType: {
    type: String,
    enum: [
      "Annual_Day", "Sports_Day", "PTM", "Cultural",
      "Workshop", "Competition", "Field_Trip",
      "Examination", "Orientation", "Farewell", "Custom"
    ],
    default: "Custom",
    index: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  startTime: { type: String, trim: true }, // "09:00 AM"
  endTime: { type: String, trim: true },   // "02:00 PM"
  venue: { type: String, trim: true },
  organizer: { type: String, trim: true },
  targetAudience: {
    type: String,
    enum: ["All", "Students", "Teachers", "Parents", "Staff", "Class_Specific"],
    default: "All",
  },
  targetClasses: [{
    type: Schema.Types.ObjectId,
    ref: "classes",
  }],
  isRecurring: { type: Boolean, default: false },
  recurrencePattern: {
    type: String,
    enum: ["Daily", "Weekly", "Monthly", "Yearly"],
  },
  status: {
    type: String,
    enum: ["Draft", "Published", "Ongoing", "Completed", "Cancelled"],
    default: "Draft",
    index: true,
  },
  attachments: [{
    fileName: { type: String },
    fileUrl: { type: String },
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  publishedAt: { type: Date },
  notificationSent: { type: Boolean, default: false },
}, { timestamps: true });

schoolEventSchema.index({ schoolId: 1, startDate: 1 });
schoolEventSchema.index({ schoolId: 1, status: 1 });
schoolEventSchema.index({ schoolId: 1, eventType: 1 });
export const SchoolEventModel = models.schoolEvents || model("schoolEvents", schoolEventSchema);

// ──────────── 4. LEAVE APPLICATIONS (Unified: Teacher + Student) ────────────
const leaveApplicationSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  applicantId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true,
  },
  applicantName: { type: String, trim: true },
  applicantType: {
    type: String,
    enum: ["Teacher", "Staff", "Student"],
    required: true,
    index: true,
  },
  // For student leave — link to student record and parent who applied
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "students",
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "parents",
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: "classes",
  },
  sectionId: {
    type: Schema.Types.ObjectId,
    ref: "sections",
  },
  leaveType: {
    type: String,
    enum: [
      // Teacher/Staff leave types
      "Casual", "Medical", "Earned", "Maternity", "Paternity", "Unpaid",
      // Student leave types
      "Family_Emergency", "Personal", "Religious", "Other"
    ],
    required: true,
  },
  reason: {
    type: String,
    required: [true, "Leave reason is required"],
    trim: true,
    maxlength: 500,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalDays: { type: Number, required: true, min: 0.5 },
  isHalfDay: { type: Boolean, default: false },
  halfDayType: {
    type: String,
    enum: ["First_Half", "Second_Half"],
  },
  attachments: [{
    fileName: { type: String },
    fileUrl: { type: String },
  }],
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Cancelled"],
    default: "Pending",
    index: true,
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  approverName: { type: String, trim: true },
  approvedAt: { type: Date },
  rejectionReason: { type: String, trim: true, maxlength: 300 },
  cancelledAt: { type: Date },
  notificationSent: { type: Boolean, default: false },
}, { timestamps: true });

leaveApplicationSchema.index({ schoolId: 1, applicantId: 1, status: 1 });
leaveApplicationSchema.index({ schoolId: 1, applicantType: 1, status: 1 });
leaveApplicationSchema.index({ schoolId: 1, startDate: 1, endDate: 1 });
leaveApplicationSchema.index({ schoolId: 1, studentId: 1 });
export const LeaveApplicationModel = models.leaveApplications || model("leaveApplications", leaveApplicationSchema);

// ──────────── 5. LEAVE BALANCES (Per Staff Member Per Year) ────────────
const leaveBalanceSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  staffId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true,
  },
  staffName: { type: String, trim: true },
  academicYear: { type: String, required: true, trim: true }, // "2026-27"
  casualLeave: {
    total: { type: Number, default: 12 },
    used: { type: Number, default: 0 },
    remaining: { type: Number, default: 12 },
  },
  sickLeave: {
    total: { type: Number, default: 8 },
    used: { type: Number, default: 0 },
    remaining: { type: Number, default: 8 },
  },
  earnedLeave: {
    total: { type: Number, default: 15 },
    used: { type: Number, default: 0 },
    remaining: { type: Number, default: 15 },
  },
  maternityLeave: {
    total: { type: Number, default: 180 },
    used: { type: Number, default: 0 },
    remaining: { type: Number, default: 180 },
  },
  paternityLeave: {
    total: { type: Number, default: 15 },
    used: { type: Number, default: 0 },
    remaining: { type: Number, default: 15 },
  },
  unpaidLeave: {
    total: { type: Number, default: 0 }, // No limit, tracks usage only
    used: { type: Number, default: 0 },
    remaining: { type: Number, default: 0 },
  },
}, { timestamps: true });

leaveBalanceSchema.index({ schoolId: 1, staffId: 1, academicYear: 1 }, { unique: true });
export const LeaveBalanceModel = models.leaveBalances || model("leaveBalances", leaveBalanceSchema);
