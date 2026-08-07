// ═══════════════════════════════════════════════════════════
// Teacher App — TypeScript Definitions & Interfaces
// ═══════════════════════════════════════════════════════════

export interface TeacherProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  empId: string;
  assignedClasses: string[];
  assignedSubjects: string[];
}

export interface Student {
  roll: number;
  name: string;
  class: string;
  parentName: string;
  phone: string;
  attendancePercent: string;
  gpa: string;
}

export interface AttendanceRecord {
  roll: number;
  name: string;
  status: "Present" | "Absent" | "Late";
  remarks?: string;
}

export interface HomeworkAssignment {
  id: string;
  title: string;
  class: string;
  subject: string;
  assignedDate: string;
  dueDate: string;
  maxMarks: number;
  submittedCount: number;
  totalStudents: number;
  instructions: string;
}

export interface WeeklyTest {
  id: string;
  title: string;
  class: string;
  subject: string;
  maxMarks: number;
  testDate: string;
  durationMinutes: number;
  status: string;
}

export interface ExamMarks {
  roll: number;
  name: string;
  theoryMarks: number;
  practicalMarks: number;
  totalMarks: number;
  cbseGrade: string;
}
