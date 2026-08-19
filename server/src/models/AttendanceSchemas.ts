// ═══════════════════════════════════════════════════════════
// SchoolMitra — Module 3: Attendance Collections (3)
// ═══════════════════════════════════════════════════════════

import { Schema, model, models } from "mongoose";

// ──────────── 16. STUDENT ATTENDANCE ────────────
const studentAttendanceSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "students",
    required: true,
    index: true,
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: "classes",
    required: true,
  },
  sectionId: {
    type: Schema.Types.ObjectId,
    ref: "sections",
    required: true,
  },
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: "subjects",
  },
  subjectName: {
    type: String,
    trim: true,
    default: "General Class Attendance",
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
    index: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Present", "Absent", "Late", "Half Day", "HalfDay", "Holiday", "Leave"],
    default: "Present",
  },
  markedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  remark: { type: String, trim: true, maxlength: 200 },
}, { timestamps: true });

studentAttendanceSchema.index({ schoolId: 1, classId: 1, date: -1 });
studentAttendanceSchema.index({ schoolId: 1, studentId: 1, date: -1 });
// Prevent duplicate attendance per student per day
studentAttendanceSchema.index({ schoolId: 1, studentId: 1, date: 1 }, { unique: true });
export const StudentAttendanceModel = models.studentAttendance || model("studentAttendance", studentAttendanceSchema);

// ──────────── ATTENDANCE SETTINGS (TIME WINDOW & LOCK CONFIG) ────────────
const attendanceSettingSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    unique: true,
    index: true,
  },
  attendanceOpenTime: {
    type: String,
    default: "08:00 AM",
  },
  attendanceCloseTime: {
    type: String,
    default: "10:00 AM",
  },
  allowEdit: {
    type: Boolean,
    default: true,
  },
  editApprovalRequired: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export const AttendanceSettingsModel = models.attendanceSettings || model("attendanceSettings", attendanceSettingSchema);

// ──────────── 17. TEACHER ATTENDANCE ────────────
const teacherAttendanceSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "teachers",
    required: true,
    index: true,
  },
  date: {
    type: Date,
    required: true,
    index: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Present", "Absent", "Late", "HalfDay", "Holiday", "Leave"],
    default: "Present",
  },
  checkInTime: { type: String },
  checkOutTime: { type: String },
  markedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
}, { timestamps: true });

teacherAttendanceSchema.index({ schoolId: 1, date: -1 });
teacherAttendanceSchema.index({ schoolId: 1, teacherId: 1, date: 1 }, { unique: true });
export const TeacherAttendanceModel = model("teacherAttendance", teacherAttendanceSchema);

// ──────────── 18. STAFF ATTENDANCE ────────────
const staffAttendanceSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  staffId: {
    type: Schema.Types.ObjectId,
    ref: "staff",
    required: true,
    index: true,
  },
  date: {
    type: Date,
    required: true,
    index: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Present", "Absent", "Late", "HalfDay", "Holiday", "Leave"],
    default: "Present",
  },
  checkInTime: { type: String },
  checkOutTime: { type: String },
  markedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
}, { timestamps: true });

staffAttendanceSchema.index({ schoolId: 1, date: -1 });
staffAttendanceSchema.index({ schoolId: 1, staffId: 1, date: 1 }, { unique: true });
export const StaffAttendanceModel = model("staffAttendance", staffAttendanceSchema);
