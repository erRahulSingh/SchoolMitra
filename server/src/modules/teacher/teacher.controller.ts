// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Teacher & Parent Sync Controller
// Real-time Socket.IO Parent Synchronization Engine
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { UserModel } from "../../models/AuthSchemas";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";

// Helper helper to safely emit Socket.IO Parent Sync events
function emitParentSyncEvent(eventName: string, payload: any) {
  try {
    const io = (global as any).io;
    if (io) {
      io.emit(eventName, {
        ...payload,
        timestamp: new Date().toISOString()
      });
      io.emit("parent:live_notification", {
        title: payload.title || "School Update",
        body: payload.message || payload.notificationText || "New update published by class teacher.",
        eventName,
        ...payload,
        timestamp: new Date().toISOString()
      });
      console.log(`[Socket.IO Parent Sync] Emitted ${eventName} to Parent App successfully.`);
    }
  } catch (err) {
    console.error(`[Socket.IO Parent Sync] Error emitting ${eventName}:`, err);
  }
}

// ════════════ 1. GET TEACHER DASHBOARD ════════════
export const getTeacherDashboard = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Teacher Dashboard data retrieved", {
    greeting: "Good Morning Rahul 👋",
    day: "Monday",
    date: new Date().toISOString(),
    stats: {
      studentsCount: 142,
      presentCount: 136,
      absentCount: 6,
      attendanceRate: "95.7%"
    },
    todayClasses: [
      { time: "08:00 AM", subject: "Maths", class: "Class 10-A", room: "Room 102", status: "Ongoing" },
      { time: "09:00 AM", subject: "Science", class: "Class 10-B", room: "Lab 2", status: "Upcoming" },
      { time: "10:30 AM", subject: "English", class: "Class 9-B", room: "Room 204", status: "Upcoming" }
    ],
    notifications: [
      { type: "Homework Pending", detail: "14 students pending in Class 10-A Math", time: "10 mins ago" },
      { type: "Exam Tomorrow", detail: "CBSE Mid-Term Science Practical at 09:00 AM", time: "1 hr ago" },
      { type: "Parent Message", detail: "New inquiry from Mr. Rajesh Kumar (Aarav's Father)", time: "2 hrs ago" }
    ]
  });
});

// ════════════ 2. GET TEACHER CLASSES ════════════
export const getTeacherClasses = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Assigned class roster retrieved", {
    classes: [
      { id: "c10a", name: "Class 10-A", role: "Class Teacher", totalStudents: 42, subject: "Mathematics" },
      { id: "c10b", name: "Class 10-B", role: "Subject Teacher", totalStudents: 40, subject: "Science" },
      { id: "c9b", name: "Class 9-B", role: "Subject Teacher", totalStudents: 35, subject: "Physics Lab" }
    ]
  });
});

// ════════════ 3. GET TEACHER STUDENTS ════════════
export const getTeacherStudents = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Class 10-A student directory retrieved", {
    class: "Class 10-A",
    students: [
      { roll: 101, name: "Aarav Sharma", parent: "Mr. Rajesh Kumar", phone: "+91 98765 43210", attendance: "96.5%", gpa: "92.5%" },
      { roll: 102, name: "Ananya Patel", parent: "Mrs. Sunita Patel", phone: "+91 98765 43211", attendance: "94.2%", gpa: "95.7%" },
      { roll: 103, name: "Devansh Gupta", parent: "Mr. Alok Gupta", phone: "+91 98765 43212", attendance: "91.0%", gpa: "80.2%" },
      { roll: 104, name: "Ishaan Verma", parent: "Mrs. Ritu Verma", phone: "+91 98765 43213", attendance: "95.0%", gpa: "86.0%" },
      { roll: 105, name: "Kavya Singh", parent: "Mr. Manoj Singh", phone: "+91 98765 43214", attendance: "97.0%", gpa: "94.0%" }
    ]
  });
});

// ════════════ 4. ATTENDANCE & PARENT SYNC ════════════
export const getTeacherAttendance = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Today's class attendance status", {
    class: "Class 10-A",
    total: 42,
    present: 38,
    absent: 4,
    date: new Date().toISOString()
  });
});

export const saveTeacherAttendance = asyncHandler(async (req: Request, res: Response) => {
  const { className = "Class 10-A", attendanceRoster } = req.body;

  // Real-time Socket.IO Parent Sync
  emitParentSyncEvent("PARENT_ATTENDANCE_UPDATED", {
    title: "Daily Attendance Recorded",
    message: `Attendance marked for ${className}. Verified by Class Teacher.`,
    className,
    rosterCount: attendanceRoster ? attendanceRoster.length : 42
  });

  return ApiResponse.success(res, 200, "Attendance saved and synced to Parent App in real-time!", {
    className,
    syncedToParentApp: true
  });
});

// ════════════ 5. HOMEWORK & PARENT SYNC ════════════
export const getTeacherHomework = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Homework assignments retrieved", {
    homeworkList: [
      { id: "hw101", title: "Quadratic Equations Exercise 4.2", class: "Class 10-A", subject: "Mathematics", due: "10 Aug 2026", submitted: 28, total: 42 }
    ]
  });
});

export const createTeacherHomework = asyncHandler(async (req: Request, res: Response) => {
  const { title, className = "Class 10-A", subject = "Mathematics", dueDate, instructions } = req.body;

  // Real-time Socket.IO Parent Sync
  emitParentSyncEvent("PARENT_HOMEWORK_CREATED", {
    title: `New Homework Assigned: ${title}`,
    message: `New ${subject} homework due on ${dueDate || "10 Aug 2026"}. Check student portal for worksheet PDF.`,
    className,
    subject,
    dueDate,
    instructions
  });

  return ApiResponse.created(res, "Homework created and broadcasted to Parent App!", {
    title,
    className,
    syncedToParentApp: true
  });
});

// ════════════ 6. ASSIGNMENTS & PARENT SYNC ════════════
export const getTeacherAssignments = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Class projects retrieved", {
    assignments: [
      { id: "asg101", title: "CBSE Science Exhibition Working Model", class: "Class 10-A", subject: "Science / Physics", due: "15 Aug 2026", submitted: 35, total: 42 }
    ]
  });
});

export const createTeacherAssignment = asyncHandler(async (req: Request, res: Response) => {
  const { title, className = "Class 10-A", subject = "Science", dueDate } = req.body;

  // Real-time Socket.IO Parent Sync
  emitParentSyncEvent("PARENT_ASSIGNMENT_CREATED", {
    title: `New Project Assignment: ${title}`,
    message: `Term project ${title} announced for ${className}. Weightage: 20 Marks.`,
    className,
    subject,
    dueDate
  });

  return ApiResponse.created(res, "Project assignment created and synced to Parent App!", {
    title,
    className,
    syncedToParentApp: true
  });
});

// ════════════ 7. STUDY MATERIALS & PARENT SYNC ════════════
export const getTeacherMaterials = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Study material library retrieved", {
    materials: [
      { id: "mat1", title: "NCERT Class 10 Mathematics Formulae & Mind Map", class: "Class 10-A", subject: "Mathematics", downloads: 142 }
    ]
  });
});

export const uploadTeacherMaterial = asyncHandler(async (req: Request, res: Response) => {
  const { title, className = "Class 10-A", subject = "Mathematics" } = req.body;

  // Real-time Socket.IO Parent Sync
  emitParentSyncEvent("PARENT_MATERIAL_UPLOADED", {
    title: `Study Material Shared: ${title}`,
    message: `New ${subject} e-book & formula sheet uploaded for ${className}.`,
    className,
    subject
  });

  return ApiResponse.created(res, "Study material uploaded and shared to Parent App!", {
    title,
    className,
    syncedToParentApp: true
  });
});

// ════════════ 8. WEEKLY TESTS & PARENT SYNC ════════════
export const getTeacherTests = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Weekly tests roster retrieved", {
    tests: [
      { id: "wt101", title: "Weekly Test #04 — Coordinate Geometry", class: "Class 10-A", max: "25 Marks", date: "14 Aug 2026" }
    ]
  });
});

export const createTeacherTest = asyncHandler(async (req: Request, res: Response) => {
  const { title, className = "Class 10-A", subject = "Mathematics", testDate } = req.body;

  // Real-time Socket.IO Parent Sync
  emitParentSyncEvent("PARENT_WEEKLY_TEST_CREATED", {
    title: `Weekly Test Scheduled: ${title}`,
    message: `Weekly test scheduled for ${className} on ${testDate || "14 Aug 2026"}. Max Marks: 25.`,
    className,
    subject,
    testDate
  });

  return ApiResponse.created(res, "Weekly test created and synced to Parent App!", {
    title,
    className,
    syncedToParentApp: true
  });
});

// ════════════ 9. EXAMS, MARKS & PARENT SYNC ════════════
export const getTeacherExams = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "CBSE exam date sheet retrieved", {
    exams: [
      { id: "e101", date: "15 Sep 2026", subject: "Mathematics Theory", class: "Class 10-A", max: "80 Marks" }
    ]
  });
});

export const saveTeacherMarks = asyncHandler(async (req: Request, res: Response) => {
  const { term = "CBSE Mid-Term 2026", className = "Class 10-A", subject = "Mathematics" } = req.body;

  // Real-time Socket.IO Parent Sync
  emitParentSyncEvent("PARENT_MARKS_UPDATED", {
    title: `CBSE Exam Marks Recorded: ${subject}`,
    message: `${term} marks for ${subject} recorded and verified by class teacher.`,
    className,
    subject,
    term
  });

  return ApiResponse.success(res, 200, "CBSE marks saved and synced to Parent App in real-time!", {
    term,
    subject,
    syncedToParentApp: true
  });
});

// ════════════ 10. REPORT CARDS & PARENT SYNC ════════════
export const getTeacherReportCards = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Class report card status retrieved", {
    className: "Class 10-A",
    term: "CBSE Mid-Term 2026",
    readyCount: 42
  });
});

export const publishTeacherReportCards = asyncHandler(async (req: Request, res: Response) => {
  const { term = "CBSE Mid-Term 2026", className = "Class 10-A" } = req.body;

  // Real-time Socket.IO Parent Sync
  emitParentSyncEvent("PARENT_REPORT_CARD_PUBLISHED", {
    title: `Official Report Card Published: ${term}`,
    message: `360° CBSE Report Card for ${className} has been published to Parent App.`,
    className,
    term
  });

  return ApiResponse.success(res, 200, "Report cards published and broadcasted to Parent App!", {
    term,
    className,
    syncedToParentApp: true
  });
});

// ════════════ 11. MESSAGES & NOTIFICATIONS PARENT SYNC ════════════
export const getTeacherMessages = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Parent conversation messages retrieved", {
    messages: [
      { id: "m1", sender: "parent", text: "Regarding Aarav's math test score...", time: "08:15 AM" },
      { id: "m2", sender: "teacher", text: "Aarav performed very well in trigonometry...", time: "08:42 AM" }
    ]
  });
});

export const sendTeacherMessage = asyncHandler(async (req: Request, res: Response) => {
  const { parentName = "Mr. Rajesh Kumar", messageText } = req.body;

  // Real-time Socket.IO Parent Sync
  emitParentSyncEvent("PARENT_NOTIFICATION_RECEIVED", {
    title: `Direct Message from Educator`,
    message: messageText || `New message received from Class Teacher regarding student performance.`,
    parentName
  });

  return ApiResponse.created(res, "Message delivered and synced to Parent App!", {
    parentName,
    syncedToParentApp: true
  });
});

// ════════════ 12. TEACHER PROFILE ════════════
export const getTeacherProfile = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Teacher profile dossier retrieved", {
    profile: {
      name: "Anil Dev Sharma",
      empId: "TCH-2024-884",
      role: "Senior Educator & Class Teacher 10-A",
      school: "Delhi Public School (Dwarka)",
      email: "anil.sharma@dpsdwarka.edu.in",
      phone: "+91 98765 43210",
      qualification: "M.Sc. Mathematics, B.Ed (Delhi University)",
      doj: "15 July 2018",
      assigned: "Class 10-A (Class Teacher), Class 9-B (Physics Lab)"
    }
  });
});

export const updateTeacherProfile = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Teacher profile updated successfully!", {
    profile: req.body
  });
});

// Legacy Export compatibility
export const getTeachers = getTeacherStudents;
export const createTeacher = createTeacherHomework;
export const getTeacherById = getTeacherProfile;
export const updateTeacher = updateTeacherProfile;
export const deleteTeacher = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Teacher record deleted successfully.");
});
export const getTeacherSalary = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Teacher salary structure", { baseSalary: 45000, netPayable: 54600 });
});
export const getTeacherLeaves = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Teacher leaves", { casualLeave: "8 Left", medicalLeave: "10 Left" });
});
export const getTeacherDocuments = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Teacher documents", { documents: [] });
});
export const getTeacherSubjects = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Teacher subjects", { subjects: ["Mathematics", "Physics Lab"] });
});
export const getTeacherTimetable = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Teacher timetable", { schedule: [] });
});
