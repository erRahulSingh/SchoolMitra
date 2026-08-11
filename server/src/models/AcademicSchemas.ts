// ═══════════════════════════════════════════════════════════
// SchoolMitra — Module 4: Academic Collections (6)
// ═══════════════════════════════════════════════════════════

import { Schema, model } from "mongoose";

// ──────────── 19. HOMEWORKS ────────────
const homeworkSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: [true, "Homework title is required"],
    trim: true,
    maxlength: 200,
  },
  description: { type: String, trim: true },
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
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  academicYearId: {
    type: Schema.Types.ObjectId,
    ref: "academicYears",
    index: true,
  },
  assignedDate: { type: Date, default: Date.now },
  dueDate: {
    type: Date,
    required: [true, "Due date is required"],
  },
  attachments: [{
    fileName: { type: String },
    fileUrl: { type: String },
    fileType: { type: String },
  }],
  status: {
    type: String,
    enum: ["DRAFT", "PUBLISHED", "CLOSED"],
    default: "DRAFT",
    index: true,
  },
}, { timestamps: true });

homeworkSchema.index({ schoolId: 1, classId: 1, dueDate: -1 });
export const HomeworkModel = model("homeworks", homeworkSchema);

// ──────────── 20. ASSIGNMENTS ────────────
const assignmentSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: [true, "Assignment title is required"],
    trim: true,
  },
  description: { type: String, trim: true },
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
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  maxMarks: { type: Number, required: true },
  startDate: { type: Date, default: Date.now },
  dueDate: { type: Date }, // submissionDate
  academicYearId: {
    type: Schema.Types.ObjectId,
    ref: "academicYears",
    index: true,
  },
  attachments: [{
    fileName: { type: String },
    fileUrl: { type: String },
    fileType: { type: String },
  }],
  status: {
    type: String,
    enum: ["DRAFT", "PUBLISHED", "CLOSED"],
    default: "DRAFT",
    index: true,
  },
  submissions: [{
    studentId: { type: Schema.Types.ObjectId, ref: "students" },
    fileUrl: { type: String },
    submittedAt: { type: Date, default: Date.now },
    marksObtained: { type: Number },
    feedback: { type: String },
    status: {
      type: String,
      enum: ["Submitted", "Graded", "Late", "NotSubmitted"],
      default: "Submitted",
    },
  }],
}, { timestamps: true });

assignmentSchema.index({ schoolId: 1, classId: 1 });
export const AssignmentModel = model("assignments", assignmentSchema);

// ──────────── 21. EXAM SCHEDULES ────────────
const examScheduleSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  examName: {
    type: String,
    required: [true, "Exam name is required"],
    trim: true,
  },
  examType: {
    type: String,
    enum: ["Unit Test", "Mid Term", "Final", "Practice", "Board Prep", "Other"],
    default: "Unit Test",
  },
  academicYearId: {
    type: Schema.Types.ObjectId,
    ref: "academicYears",
    required: true,
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: "classes",
    required: true,
    index: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  subjects: [{
    subjectId: { type: Schema.Types.ObjectId, ref: "subjects" },
    examDate: { type: Date },
    startTime: { type: String },
    endTime: { type: String },
    maxMarks: { type: Number },
    passingMarks: { type: Number },
    room: { type: String },
  }],
  status: {
    type: String,
    enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
    default: "Upcoming",
  },
}, { timestamps: true });

examScheduleSchema.index({ schoolId: 1, academicYearId: 1 });
examScheduleSchema.index({ schoolId: 1, classId: 1, startDate: -1 });
export const ExamScheduleModel = model("examSchedules", examScheduleSchema);

// ──────────── 22. MARKS ────────────
const markSchema = new Schema({
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
  examId: {
    type: Schema.Types.ObjectId,
    ref: "examSchedules",
    required: true,
    index: true,
  },
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: "subjects",
    required: true,
  },
  marksObtained: {
    type: Number,
    required: true,
    min: 0,
  },
  maxMarks: {
    type: Number,
    required: true,
    min: 1,
  },
  grade: { type: String, trim: true },
  isPassed: { type: Boolean },
  enteredBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
}, { timestamps: true });

markSchema.index({ schoolId: 1, examId: 1, studentId: 1 });
markSchema.index({ schoolId: 1, examId: 1, subjectId: 1, studentId: 1 }, { unique: true });
export const MarkModel = model("marks", markSchema);

// ──────────── 23. REPORT CARDS ────────────
const reportCardSchema = new Schema({
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
  academicYearId: {
    type: Schema.Types.ObjectId,
    ref: "academicYears",
    required: true,
    index: true,
  },
  examId: {
    type: Schema.Types.ObjectId,
    ref: "exams",
    required: true,
    index: true,
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: "classes",
    required: true,
    index: true,
  },
  subjects: [{
    subjectId: { type: Schema.Types.ObjectId, ref: "subjects", required: true },
    obtainedMarks: { type: Number, required: true },
    maxMarks: { type: Number, required: true },
    percentage: { type: Number, required: true },
    grade: { type: String },
    isPassed: { type: Boolean }
  }],
  totalMarks: { type: Number, required: true },
  obtainedMarks: { type: Number, required: true },
  percentage: { type: Number, required: true },
  grade: { type: String },
  remarks: { type: String, trim: true }, // maps to teacherRemarks
  status: {
    type: String,
    enum: ["DRAFT", "PENDING_APPROVAL", "APPROVED", "PUBLISHED"],
    default: "DRAFT",
    index: true,
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  approvedAt: {
    type: Date,
  },
}, { timestamps: true });

reportCardSchema.index({ schoolId: 1, studentId: 1, examId: 1 }, { unique: true });
export const ReportCardModel = model("reportCards", reportCardSchema);

// ──────────── 24. REMARKS ────────────
const remarkSchema = new Schema({
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
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  type: {
    type: String,
    enum: ["Academic", "Behavioral", "Achievement", "Health", "General"],
    default: "General",
  },
  text: {
    type: String,
    required: [true, "Remark text is required"],
    trim: true,
    maxlength: 500,
  },
  isPositive: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

remarkSchema.index({ schoolId: 1, studentId: 1 });
export const RemarkModel = model("remarks", remarkSchema);
export { ExamScheduleModel as ExamModel };

// ──────────── 25. STUDENT ATTENDANCE (UNIQUE COMPOUND INDEX PREVENTS DUPLICATES) ────────────
const attendanceSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "users",
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
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "students",
    required: true,
    index: true,
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Leave", "Late"],
    default: "Present",
    required: true,
  },
  remarks: { type: String, trim: true },
}, { timestamps: true });

// 1. UNIQUE COMPOUND INDEX: Prevents duplicate attendance entry per student per day
attendanceSchema.index({ schoolId: 1, studentId: 1, date: 1 }, { unique: true });

// 2. CLASS DAILY ATTENDANCE RECORD INDEX
attendanceSchema.index({ schoolId: 1, classId: 1, sectionId: 1, date: 1 });

// 3. TEACHER ATTENDANCE DISPATCH TIMELINE INDEX
attendanceSchema.index({ schoolId: 1, teacherId: 1, createdAt: -1 });

export const AttendanceModel = model("attendances", attendanceSchema);

// ──────────── 23. ATTENDANCE CORRECTION REQUESTS ────────────
const attendanceCorrectionRequestSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true,
  },
  attendanceId: {
    type: Schema.Types.ObjectId,
    ref: "attendances",
    required: true,
    index: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "students",
    required: true,
    index: true,
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
  },
  currentStatus: {
    type: String,
    enum: ["Present", "Absent", "Leave", "Late"],
    required: true,
  },
  requestedStatus: {
    type: String,
    enum: ["Present", "Absent", "Leave", "Late"],
    required: true,
  },
  reason: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["PendingAdminApproval", "Approved", "Rejected"],
    default: "PendingAdminApproval",
    index: true,
  },
  adminRemarks: {
    type: String,
    trim: true,
  },
  processedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  processedAt: {
    type: Date,
  },
}, { timestamps: true });

export const AttendanceCorrectionRequestModel = model("attendanceCorrectionRequests", attendanceCorrectionRequestSchema);

// ──────────── 24. STUDY MATERIALS ────────────
const studyMaterialSchema = new Schema({
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
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "users",
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
    index: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  attachments: [{
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, enum: ["PDF", "PPT", "DOC", "IMAGE", "LINK"], required: true },
    fileSize: { type: String },
  }],
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
    index: true,
  },
}, { timestamps: true });

studyMaterialSchema.index({ schoolId: 1, classId: 1, subjectId: 1 });
export const StudyMaterialModel = model("studyMaterials", studyMaterialSchema);

// ──────────── 25. WEEKLY TESTS ────────────
const weeklyTestSchema = new Schema({
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
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "users",
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
    required: true,
    index: true,
  },
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: "subjects",
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  testDate: {
    type: Date,
    required: true,
  },
  maxMarks: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["DRAFT", "PUBLISHED", "CLOSED"],
    default: "DRAFT",
    index: true,
  },
}, { timestamps: true });

weeklyTestSchema.index({ schoolId: 1, classId: 1, sectionId: 1, testDate: -1 });
export const WeeklyTestModel = model("weeklyTests", weeklyTestSchema);

// ──────────── 26. WEEKLY TEST QUESTIONS ────────────
const weeklyTestQuestionSchema = new Schema({
  testId: {
    type: Schema.Types.ObjectId,
    ref: "weeklyTests",
    required: true,
    index: true,
  },
  questionText: {
    type: String,
    required: true,
    trim: true,
  },
  options: [{
    type: String,
    trim: true,
  }],
  correctOption: {
    type: String,
    trim: true,
  },
  marks: {
    type: Number,
    default: 1,
  },
}, { timestamps: true });

export const WeeklyTestQuestionModel = model("weeklyTestQuestions", weeklyTestQuestionSchema);

// ──────────── 27. WEEKLY TEST RESULTS ────────────
const weeklyTestResultSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  testId: {
    type: Schema.Types.ObjectId,
    ref: "weeklyTests",
    required: true,
    index: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "students",
    required: true,
    index: true,
  },
  marksObtained: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    trim: true,
  },
  remarks: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["SUBMITTED", "PUBLISHED"],
    default: "SUBMITTED",
    index: true,
  },
}, { timestamps: true });

weeklyTestResultSchema.index({ schoolId: 1, testId: 1, studentId: 1 }, { unique: true });
export const WeeklyTestResultModel = model("weeklyTestResults", weeklyTestResultSchema);

// ──────────── 28. EXAM MANAGEMENT MODEL ────────────
const examSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  examName: {
    type: String,
    required: true,
    trim: true,
  },
  examType: {
    type: String,
    enum: ["Unit Test", "Half Yearly", "Annual", "Other"],
    required: true,
  },
  academicYearId: {
    type: Schema.Types.ObjectId,
    ref: "academicYears",
    required: true,
    index: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  classes: [{
    type: Schema.Types.ObjectId,
    ref: "classes",
    required: true,
  }],
  sections: [{
    type: Schema.Types.ObjectId,
    ref: "sections",
    required: true,
  }],
  subjects: [{
    type: Schema.Types.ObjectId,
    ref: "subjects",
    required: true,
  }],
  maxMarks: {
    type: Number,
    required: true,
  },
  passingMarks: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["DRAFT", "PUBLISHED", "CLOSED"],
    default: "DRAFT",
    index: true,
  },
  schedule: [{
    subjectId: { type: Schema.Types.ObjectId, ref: "subjects", required: true },
    examDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    room: { type: String },
    maxMarks: { type: Number },
    passingMarks: { type: Number }
  }]
}, { timestamps: true });

examSchema.index({ schoolId: 1, academicYearId: 1, startDate: -1 });
export const ExamModel = model("exams", examSchema);

// ──────────── 29. EXAM MARKS SUBMISSIONS (APPROVAL WORKFLOW) ────────────
const examMarkSubmissionSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  examId: {
    type: Schema.Types.ObjectId,
    ref: "exams",
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
    required: true,
    index: true,
  },
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: "subjects",
    required: true,
    index: true,
  },
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: ["DRAFT", "SUBMITTED", "UNDER_REVIEW", "APPROVED", "PUBLISHED", "REJECTED"],
    default: "DRAFT",
    index: true,
  },
  adminRemarks: {
    type: String,
    trim: true,
  },
  submittedAt: {
    type: Date,
  },
  reviewedAt: {
    type: Date,
  },
  reviewedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
}, { timestamps: true });

examMarkSubmissionSchema.index({ schoolId: 1, examId: 1, classId: 1, sectionId: 1, subjectId: 1 }, { unique: true });
export const ExamMarkSubmissionModel = model("examMarkSubmissions", examMarkSubmissionSchema);






