// ═══════════════════════════════════════════════════════════
// SchoolMitra — Module 2: School Core Collections (8)
// ═══════════════════════════════════════════════════════════

import { Schema, model } from "mongoose";

// ──────────── 8. STUDENTS ────────────
const studentSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  rollNo: {
    type: String,
    required: [true, "Roll number is required"],
    trim: true,
  },
  admissionNo: { type: String, trim: true },
  name: {
    type: String,
    required: [true, "Student name is required"],
    trim: true,
    maxlength: 80,
  },
  dateOfBirth: { type: Date },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  photo: { type: String },
  classId: {
    type: Schema.Types.ObjectId,
    ref: "classes",
    required: true,
    index: true,
  },
  sectionId: {
    type: Schema.Types.ObjectId,
    ref: "sections",
    required: true,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "parents",
  },
  address: { type: String, trim: true },
  city: { type: String, trim: true },
  admissionDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Graduated", "Transferred", "Expelled"],
    default: "Active",
    index: true,
  },
  previousSchool: { type: String, trim: true },
  aadharNo: { type: String, trim: true },
  religion: { type: String, trim: true },
  category: {
    type: String,
    enum: ["General", "OBC", "SC", "ST", "EWS"],
  },
  transportMode: {
    type: String,
    enum: ["Bus", "Self", "Walk", "Van"],
    default: "Self",
  },
}, { timestamps: true });

studentSchema.index({ schoolId: 1, classId: 1, sectionId: 1 });
studentSchema.index({ schoolId: 1, rollNo: 1 }, { unique: true });
studentSchema.index({ schoolId: 1, admissionNo: 1 }, { unique: true, sparse: true });
studentSchema.index({ schoolId: 1, parentId: 1 });
export const StudentModel = model("students", studentSchema);

// ──────────── 9. PARENTS ────────────
const parentSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  fatherName: { type: String, trim: true },
  motherName: { type: String, trim: true },
  guardianName: { type: String, trim: true },
  name: {
    type: String,
    required: [true, "Parent name is required"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
  },
  alternatePhone: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  address: { type: String, trim: true },
  occupation: { type: String, trim: true },
  annualIncome: { type: Number },
  relation: {
    type: String,
    enum: ["Father", "Mother", "Guardian"],
    default: "Father",
  },
  children: [{
    type: Schema.Types.ObjectId,
    ref: "students",
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
}, { timestamps: true });

parentSchema.index({ schoolId: 1, phone: 1 }, { unique: true });
export const ParentModel = model("parents", parentSchema);

// ──────────── 10. TEACHERS ────────────
const teacherSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: [true, "Teacher name is required"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    trim: true,
  },
  email: { type: String, trim: true, lowercase: true },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  dateOfBirth: { type: Date },
  photo: { type: String },
  qualification: { type: String, trim: true },
  specialization: { type: String, trim: true },
  subjects: [{
    type: Schema.Types.ObjectId,
    ref: "subjects",
  }],
  assignedClasses: [{
    type: Schema.Types.ObjectId,
    ref: "classes",
  }],
  joiningDate: { type: Date, default: Date.now },
  salary: { type: Number, default: 0 },
  designation: {
    type: String,
    enum: ["Teacher", "Senior Teacher", "Head of Department", "Vice Principal", "Principal"],
    default: "Teacher",
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "OnLeave", "Resigned"],
    default: "Active",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
}, { timestamps: true });

teacherSchema.index({ schoolId: 1, phone: 1 }, { unique: true });
teacherSchema.index({ schoolId: 1, userId: 1 });
teacherSchema.index({ schoolId: 1, status: 1 });
teacherSchema.index({ schoolId: 1, createdAt: -1 });
export const TeacherModel = model("teachers", teacherSchema);


// ──────────── 11. STAFF ────────────
const staffSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: [true, "Staff name is required"],
    trim: true,
  },
  phone: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  designation: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    enum: ["Administration", "Accounts", "IT", "Security", "Maintenance", "Transport", "Library", "Lab", "Other"],
    default: "Administration",
  },
  joiningDate: { type: Date, default: Date.now },
  salary: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Resigned"],
    default: "Active",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
}, { timestamps: true });

staffSchema.index({ schoolId: 1, department: 1 });
export const StaffModel = model("staff", staffSchema);

// ──────────── 12. CLASSES ────────────
const classSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  className: {
    type: String,
    required: [true, "Class name is required"],
    trim: true,
  },
  numericOrder: {
    type: Number,
    required: true,
  },
  sections: {
    type: [String],
    default: ["A"],
  },
  academicYearId: {
    type: Schema.Types.ObjectId,
    ref: "academicYears",
  },
}, { timestamps: true });

classSchema.index({ schoolId: 1, className: 1 }, { unique: true });
export const ClassModel = model("classes", classSchema);

// ──────────── 13. SECTIONS ────────────
const sectionSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  sectionName: {
    type: String,
    required: [true, "Section name is required"],
    trim: true,
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: "classes",
    required: true,
    index: true,
  },
  classTeacherId: {
    type: Schema.Types.ObjectId,
    ref: "teachers",
  },
  maxStrength: { type: Number, default: 40 },
}, { timestamps: true });

sectionSchema.index({ schoolId: 1, classId: 1, sectionName: 1 }, { unique: true });
export const SectionModel = model("sections", sectionSchema);

// ──────────── 14. SUBJECTS ────────────
const subjectSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  subjectName: {
    type: String,
    required: [true, "Subject name is required"],
    trim: true,
  },
  code: {
    type: String,
    trim: true,
    uppercase: true,
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: "classes",
    index: true,
  },
  type: {
    type: String,
    enum: ["Core", "Elective", "Language", "Co-Curricular"],
    default: "Core",
  },
  maxMarks: { type: Number, default: 100 },
}, { timestamps: true });

subjectSchema.index({ schoolId: 1, classId: 1 });
export const SubjectModel = model("subjects", subjectSchema);

// ──────────── 15. ACADEMIC YEARS ────────────
const academicYearSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  year: {
    type: String,
    required: [true, "Academic year is required"],
    trim: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isCurrent: { type: Boolean, default: false, index: true },
}, { timestamps: true });

academicYearSchema.index({ schoolId: 1, year: 1 }, { unique: true });
export const AcademicYearModel = model("academicYears", academicYearSchema);

// ──────────── 16. TEACHER ASSIGNMENTS ────────────
const teacherAssignmentSchema = new Schema({
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
  classId: {
    type: Schema.Types.ObjectId,
    ref: "classes",
    required: true,
    index: true,
  },
  sectionId: {
    type: Schema.Types.ObjectId,
    ref: "sections",
  },
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: "subjects",
    required: true,
  },
  academicYear: {
    type: String,
    default: "2024-2025",
    trim: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
    index: true,
  },
}, { timestamps: true });

teacherAssignmentSchema.index({ schoolId: 1, teacherId: 1, classId: 1, subjectId: 1 }, { unique: true });
teacherAssignmentSchema.index({ schoolId: 1, teacherId: 1 });
teacherAssignmentSchema.index({ schoolId: 1, teacherId: 1, classId: 1 });
teacherAssignmentSchema.index({ schoolId: 1, classId: 1, sectionId: 1 });
export const TeacherAssignmentModel = model("teacherAssignments", teacherAssignmentSchema);


