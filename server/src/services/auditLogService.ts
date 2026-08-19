// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Teacher Audit Trail Service
// Comprehensive change-log tracking for School Auditability & Compliance
// ═══════════════════════════════════════════════════════════

export interface TeacherAuditLogEntry {
  schoolId: string;
  teacherId: string;
  teacherName: string;
  action: "UPDATE_ATTENDANCE" | "UPDATE_MARKS" | "CREATE_HOMEWORK" | "PUBLISH_TEST" | "SUBMIT_REPORT_CARD" | "SEND_MESSAGE" | "CREATE_ANNOUNCEMENT"
    | "CREATE_EVENT" | "UPDATE_EVENT" | "DELETE_EVENT" | "PUBLISH_EVENT"
    | "APPLY_LEAVE" | "APPROVE_LEAVE" | "REJECT_LEAVE" | "CANCEL_LEAVE"
    | "ADD_HOLIDAY" | "UPDATE_HOLIDAY" | "DELETE_HOLIDAY"
    | "CREATE_CALENDAR" | "UPDATE_CALENDAR";
  classId?: string;
  className?: string;
  studentId?: string;
  studentName?: string;
  targetDate?: string;
  oldValue: any;
  newValue: any;
  ipAddress?: string;
  timestamp?: string;
}

// In-memory persistent cache for instant high-speed audit log retrieval
export const memoryTeacherAuditLogs: TeacherAuditLogEntry[] = [
  {
    schoolId: "sch_101",
    teacherId: "tch_65a88203921",
    teacherName: "Rahul Sharma",
    action: "UPDATE_ATTENDANCE",
    classId: "class_8",
    className: "Class 8 - Section A",
    studentId: "st_101",
    studentName: "Aarav Sharma",
    targetDate: "2026-08-07",
    oldValue: { status: "Present" },
    newValue: { status: "Absent", reason: "Uninformed Absence" },
    ipAddress: "192.168.1.45",
    timestamp: "2026-08-07T15:22:00.000Z"
  },
  {
    schoolId: "sch_101",
    teacherId: "tch_65a88203921",
    teacherName: "Rahul Sharma",
    action: "UPDATE_MARKS",
    classId: "class_8",
    className: "Class 8 - Section A",
    studentId: "st_102",
    studentName: "Diya Verma",
    targetDate: "2026-08-05",
    oldValue: { obtainedMarks: 40, grade: "A" },
    newValue: { obtainedMarks: 44, grade: "A+" },
    ipAddress: "192.168.1.45",
    timestamp: "2026-08-06T11:15:00.000Z"
  }
];

export const logTeacherAction = (entry: TeacherAuditLogEntry) => {
  try {
    const fullLogEntry: TeacherAuditLogEntry = {
      ...entry,
      timestamp: entry.timestamp || new Date().toISOString()
    };

    memoryTeacherAuditLogs.unshift(fullLogEntry);
    console.log(`[Teacher Audit Trail] Logged ${entry.action} by ${entry.teacherName} for ${entry.studentName || entry.className}`);

    return fullLogEntry;
  } catch (err) {
    console.error("[Teacher Audit Trail Error]:", err);
    return null;
  }
};
