// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Centrally Maintained Global Permissions Registry
// ═══════════════════════════════════════════════════════════

export interface PermissionDefinition {
  key: string;
  module: string;
  action: string;
  description: string;
}

export const GLOBAL_PERMISSIONS_REGISTRY: PermissionDefinition[] = [
  // ── 1. Students ──
  { key: "students.view", module: "students", action: "view", description: "View student profiles & rosters" },
  { key: "students.create", module: "students", action: "create", description: "Add new student enrollments" },
  { key: "students.update", module: "students", action: "update", description: "Edit student profile & records" },
  { key: "students.delete", module: "students", action: "delete", description: "Remove student from school" },

  // ── 2. Attendance ──
  { key: "attendance.view", module: "attendance", action: "view", description: "View attendance records & logs" },
  { key: "attendance.create", module: "attendance", action: "create", description: "Mark daily student roll call" },
  { key: "attendance.update", module: "attendance", action: "update", description: "Update historical attendance records" },
  { key: "attendance.delete", module: "attendance", action: "delete", description: "Delete attendance entries" },
  { key: "attendance.correction.request", module: "attendance", action: "correction.request", description: "Submit attendance correction request" },
  { key: "attendance.correction.approve", module: "attendance", action: "correction.approve", description: "Approve attendance correction requests" },
  { key: "leave.view", module: "leave", action: "view", description: "View leave applications & balance" },
  { key: "leave.approve", module: "leave", action: "approve", description: "Final approval for leave applications" },

  // ── 3. Homework ──
  { key: "homework.view", module: "homework", action: "view", description: "View homework assignments" },
  { key: "homework.create", module: "homework", action: "create", description: "Create daily homework tasks" },
  { key: "homework.update", module: "homework", action: "update", description: "Edit homework details & deadlines" },
  { key: "homework.delete", module: "homework", action: "delete", description: "Delete homework tasks" },
  { key: "homework.publish", module: "homework", action: "publish", description: "Broadcast homework to parent app" },

  // ── 4. Assignments ──
  { key: "assignments.view", module: "assignments", action: "view", description: "View student assignments" },
  { key: "assignments.create", module: "assignments", action: "create", description: "Create new subject assignments" },
  { key: "assignments.update", module: "assignments", action: "update", description: "Modify assignment parameters" },
  { key: "assignments.delete", module: "assignments", action: "delete", description: "Remove assignments" },
  { key: "assignments.publish", module: "assignments", action: "publish", description: "Broadcast assignments to parent app" },

  // ── 5. Exams ──
  { key: "exams.view", module: "exams", action: "view", description: "View exam schedules & timetables" },
  { key: "exams.create", module: "exams", action: "create", description: "Create new examinations" },
  { key: "exams.update", module: "exams", action: "update", description: "Edit exam dates & weightage" },
  { key: "exams.delete", module: "exams", action: "delete", description: "Delete examination records" },

  // ── 6. Marks ──
  { key: "marks.view", module: "marks", action: "view", description: "View student exam marks & grades" },
  { key: "marks.create", module: "marks", action: "create", description: "Enter subject marks for students" },
  { key: "marks.update", module: "marks", action: "update", description: "Modify submitted marks" },
  { key: "marks.delete", module: "marks", action: "delete", description: "Delete marks entries" },
  { key: "marks.publish", module: "marks", action: "publish", description: "Publish marksheets to parents" },
  { key: "marks.submit", module: "marks", action: "submit", description: "Submit marks roster to Admin for approval" },

  // ── 7. Report Card ──
  { key: "reports.view", module: "reports", action: "view", description: "View report cards" },
  { key: "reports.create", module: "reports", action: "create", description: "Generate new batch report cards" },
  { key: "reports.update", module: "reports", action: "update", description: "Edit report card grades & remarks" },
  { key: "reports.delete", module: "reports", action: "delete", description: "Delete report card records" },
  { key: "reports.publish", module: "reports", action: "publish", description: "Publish report cards to parents" },

  // ── 8. Study Material ──
  { key: "materials.view", module: "materials", action: "view", description: "View study materials & PDFs" },
  { key: "materials.create", module: "materials", action: "create", description: "Upload study materials & notes" },
  { key: "materials.update", module: "materials", action: "update", description: "Update study material attachments" },
  { key: "materials.delete", module: "materials", action: "delete", description: "Delete study material files" },

  // ── 9. Communication ──
  { key: "announcements.view", module: "announcements", action: "view", description: "View school & class announcements" },
  { key: "announcements.create", module: "announcements", action: "create", description: "Broadcast school circulars & notices" },
  { key: "announcements.update", module: "announcements", action: "update", description: "Edit existing announcements" },
  { key: "announcements.delete", module: "announcements", action: "delete", description: "Delete school announcements" },
  { key: "announcements.publish", module: "announcements", action: "publish", description: "Publish announcement to mobile apps" },
  { key: "circulars.view", module: "circulars", action: "view", description: "View official school circulars & PDFs" },
  { key: "circulars.create", module: "circulars", action: "create", description: "Create long-form circular notices" },
  { key: "circulars.update", module: "circulars", action: "update", description: "Edit circular notice details & attachments" },
  { key: "circulars.delete", module: "circulars", action: "delete", description: "Delete circular records" },
  { key: "circulars.publish", module: "circulars", action: "publish", description: "Publish circulars to parent app" },
  { key: "messages.view", module: "messages", action: "view", description: "View parent/staff chat messages" },
  { key: "messages.create", module: "messages", action: "create", description: "Send direct messages to parents" },
  { key: "notifications.view", module: "notifications", action: "view", description: "View notification inbox & alert feeds" },
  { key: "emergency.broadcast", module: "emergency", action: "broadcast", description: "Trigger emergency broadcasts (School closure, Bus emergency, Weather warning)" },

  // ── 10. Leave ──
  { key: "leave.create", module: "leave", action: "create", description: "Submit teacher leave applications" },
  { key: "leave.view", module: "leave", action: "view", description: "View personal & staff leave status" },
  { key: "leave.cancel", module: "leave", action: "cancel", description: "Cancel pending leave applications" },

  // ── 11. Weekly Tests & Results (Phase 4) ──
  { key: "weeklytests.view", module: "weeklytests", action: "view", description: "View weekly tests list" },
  { key: "weeklytests.create", module: "weeklytests", action: "create", description: "Create weekly test" },
  { key: "weeklytests.update", module: "weeklytests", action: "update", description: "Update weekly test details" },
  { key: "weeklytests.delete", module: "weeklytests", action: "delete", description: "Delete weekly test" },
  { key: "weeklytests.publish", module: "weeklytests", action: "publish", description: "Publish weekly test scheduling" },

  { key: "weeklyresults.view", module: "weeklyresults", action: "view", description: "View weekly test scores" },
  { key: "weeklyresults.create", module: "weeklyresults", action: "create", description: "Enter student weekly test marks" },
  { key: "weeklyresults.update", module: "weeklyresults", action: "update", description: "Edit student weekly test marks" },
  { key: "weeklyresults.publish", module: "weeklyresults", action: "publish", description: "Publish weekly test results to parent app" },

  // ── 12. Calendar (Phase 10) ──
  { key: "calendar.view", module: "calendar", action: "view", description: "View school calendar & holidays" },
  { key: "calendar.create", module: "calendar", action: "create", description: "Create school calendar entries" },
  { key: "calendar.update", module: "calendar", action: "update", description: "Update calendar & holidays" },
  { key: "calendar.delete", module: "calendar", action: "delete", description: "Delete calendar entries" },

  // ── 13. Events (Phase 10) ──
  { key: "events.view", module: "events", action: "view", description: "View school events" },
  { key: "events.create", module: "events", action: "create", description: "Create school events" },
  { key: "events.update", module: "events", action: "update", description: "Update event details" },
  { key: "events.delete", module: "events", action: "delete", description: "Delete school events" },
  { key: "events.publish", module: "events", action: "publish", description: "Publish events to parent/teacher apps" },

  // ── 14. Leave Management (Phase 10) ──
  { key: "leave.approve", module: "leave", action: "approve", description: "Approve/reject leave applications" },
  { key: "leave.viewAll", module: "leave", action: "viewAll", description: "View all staff/student leaves" },

  // ── 15. Documents & Certificates Management (Phase 15 & 16) ──
  { key: "students.documents.view", module: "documents", action: "view", description: "View student compliance documents" },
  { key: "students.documents.upload", module: "documents", action: "upload", description: "Upload student compliance documents" },
  { key: "students.documents.update", module: "documents", action: "update", description: "Update/replace student compliance documents" },
  { key: "students.documents.delete", module: "documents", action: "delete", description: "Delete student compliance documents" },

  { key: "teachers.documents.view", module: "documents", action: "view", description: "View teacher compliance documents" },
  { key: "teachers.documents.upload", module: "documents", action: "upload", description: "Upload teacher compliance documents" },
  { key: "teachers.documents.update", module: "documents", action: "update", description: "Update/replace teacher compliance documents" },
  { key: "teachers.documents.delete", module: "documents", action: "delete", description: "Delete teacher compliance documents" },

  { key: "certificates.create", module: "certificates", action: "create", description: "Generate & issue certificates" },
  { key: "certificates.view", module: "certificates", action: "view", description: "View issued certificates & templates" },
  { key: "certificates.download", module: "certificates", action: "download", description: "Download certificate PDF files" },
  { key: "certificates.revoke", module: "certificates", action: "revoke", description: "Revoke issued certificates" },

  { key: "own.child.documents.view", module: "parent", action: "view", description: "Parent view linked child documents" },
  { key: "own.child.certificates.view", module: "parent", action: "view", description: "Parent view linked child certificates" },
  { key: "own.child.certificates.download", module: "parent", action: "download", description: "Parent download linked child certificates" },
];

export const DEFAULT_TEACHER_PERMISSIONS: string[] = [
  "students.view",
  "students.documents.view",
  "attendance.view",
  "attendance.create",
  "attendance.correction.request",
  "homework.view",
  "homework.create",
  "homework.update",
  "homework.delete",
  "homework.publish",
  "assignments.view",
  "assignments.create",
  "assignments.update",
  "assignments.delete",
  "assignments.publish",
  "marks.view",
  "marks.create",
  "marks.update",
  "marks.delete",
  "marks.submit",
  "reports.view",
  "materials.view",
  "materials.create",
  "materials.update",
  "materials.delete",
  "weeklytests.view",
  "weeklytests.create",
  "weeklytests.update",
  "weeklytests.delete",
  "weeklytests.publish",
  "weeklyresults.view",
  "weeklyresults.create",
  "weeklyresults.update",
  "weeklyresults.publish",
  "announcements.view",
  "announcements.create",
  "messages.view",
  "messages.create",
  // Phase 10: Calendar, Events & Leave
  "calendar.view",
  "events.view",
  "leave.create",
  "leave.view",
  "leave.cancel",
];
