// ═══════════════════════════════════════════════════════════
// Teacher App — Centralized API Client Service
// Integrates with /api/v1/teacher Backend Microservices
// ═══════════════════════════════════════════════════════════

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1/teacher";

export async function fetchTeacherApi(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("teacher_access_token") : null;
  
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`[Teacher API Service Error] ${endpoint}:`, error);
    return { success: false, message: "Network connection error" };
  }
}

export const teacherService = {
  getDashboard: () => fetchTeacherApi("/dashboard"),
  getClasses: () => fetchTeacherApi("/classes"),
  getStudents: () => fetchTeacherApi("/students"),
  getAttendance: () => fetchTeacherApi("/attendance"),
  saveAttendance: (roster: any) => fetchTeacherApi("/attendance", { method: "POST", body: JSON.stringify({ attendanceRoster: roster }) }),
  getHomework: () => fetchTeacherApi("/homework"),
  createHomework: (data: any) => fetchTeacherApi("/homework", { method: "POST", body: JSON.stringify(data) }),
  getAssignments: () => fetchTeacherApi("/assignments"),
  createAssignment: (data: any) => fetchTeacherApi("/assignments", { method: "POST", body: JSON.stringify(data) }),
  getMaterials: () => fetchTeacherApi("/materials"),
  uploadMaterial: (data: any) => fetchTeacherApi("/materials", { method: "POST", body: JSON.stringify(data) }),
  getTests: () => fetchTeacherApi("/tests"),
  createTest: (data: any) => fetchTeacherApi("/tests", { method: "POST", body: JSON.stringify(data) }),
  getExams: () => fetchTeacherApi("/exams"),
  saveMarks: (data: any) => fetchTeacherApi("/exams", { method: "POST", body: JSON.stringify(data) }),
  getReportCards: () => fetchTeacherApi("/report-cards"),
  publishReportCards: (data: any) => fetchTeacherApi("/report-cards", { method: "POST", body: JSON.stringify(data) }),
  getMessages: () => fetchTeacherApi("/messages"),
  sendMessage: (data: any) => fetchTeacherApi("/messages", { method: "POST", body: JSON.stringify(data) }),
  getProfile: () => fetchTeacherApi("/profile")
};
