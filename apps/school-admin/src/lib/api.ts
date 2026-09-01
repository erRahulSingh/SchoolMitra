// ═══════════════════════════════════════════════════════════
// SchoolMitra — Dynamic API Client (School Admin ERP)
// ═══════════════════════════════════════════════════════════

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; [key: string]: any }> {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const json = await res.json();

    // ─── STEP 10: CENTRAL TENANT STATUS INTERCEPTOR ───
    if (
      res.status === 403 ||
      json.code === "SCHOOL_ACCESS_SUSPENDED" ||
      json.code === "SCHOOL_ACCOUNT_EXPIRED" ||
      json.code === "SCHOOL_ACCOUNT_DEACTIVATED" ||
      json.code === "SESSION_INVALIDATED" ||
      json.schoolStatus === "SUSPENDED" ||
      json.schoolStatus === "EXPIRED" ||
      json.schoolStatus === "DEACTIVATED"
    ) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("school_status_blocked", {
            detail: {
              code: json.code || "SCHOOL_ACCESS_SUSPENDED",
              message: json.message || "Your school account is currently inactive.",
              schoolStatus: json.schoolStatus || "SUSPENDED",
              schoolName: json.schoolName || localStorage.getItem("schoolName") || "ABC Public School",
              schoolCode: json.schoolCode || ""
            }
          })
        );
      }
    }

    return json;
  } catch (err: any) {
    console.warn(`[SchoolAdmin API Error] ${endpoint}:`, err?.message || err);
    return {
      success: false,
      message: err?.message || "Network error. Connected to offline fallback mode.",
    };
  }
}

export const schoolAdminApi = {
  // Auth
  login: (credentials: any) => apiRequest("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
  logout: (payload?: any) => apiRequest("/auth/logout", { method: "POST", body: JSON.stringify(payload || {}) }),
  
  // Dashboard & Realtime Telemetry
  getHealth: () => apiRequest("/health"),
  getDashboardOverview: () => apiRequest("/admin/dashboard/overview"),
  getDashboardCards: () => apiRequest("/admin/dashboard/cards"),
  getDashboardCharts: () => apiRequest("/admin/dashboard/charts"),
  getDashboardActivity: () => apiRequest("/admin/dashboard/activity"),
  getDashboardCalendar: () => apiRequest("/admin/dashboard/calendar"),
  
  // Students & Sub-domains
  getStudents: (params?: string) => apiRequest(`/students${params ? `?${params}` : ""}`),
  createStudent: (studentData: any) => apiRequest("/students", { method: "POST", body: JSON.stringify(studentData) }),
  getStudentById: (id: string) => apiRequest(`/students/${id}`),
  updateStudent: (id: string, data: any) => apiRequest(`/students/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteStudent: (id: string) => apiRequest(`/students/${id}`, { method: "DELETE" }),
  updateStudentStatus: (id: string, status: string) => apiRequest(`/students/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  getStudentDocuments: (id: string) => apiRequest(`/students/${id}/documents`),
  getStudentAttendance: (id: string) => apiRequest(`/students/${id}/attendance`),
  getStudentFees: (id: string) => apiRequest(`/students/${id}/fees`),
  getStudentExams: (id: string) => apiRequest(`/students/${id}/exams`),
  getStudentTransport: (id: string) => apiRequest(`/students/${id}/transport`),
  getStudentTimeline: (id: string) => apiRequest(`/students/${id}/timeline`),
  getStudentParentMapping: (id: string) => apiRequest(`/students/${id}/parent`),

  // Teachers & Sub-domains
  getTeachers: () => apiRequest("/teachers"),
  createTeacher: (teacherData: any) => apiRequest("/teachers", { method: "POST", body: JSON.stringify(teacherData) }),
  getTeacherById: (id: string) => apiRequest(`/teachers/${id}`),
  getTeacherAttendance: (id: string) => apiRequest(`/teachers/${id}/attendance`),
  getTeacherSalary: (id: string) => apiRequest(`/teachers/${id}/salary`),
  getTeacherLeaves: (id: string) => apiRequest(`/teachers/${id}/leaves`),

  // Academics
  getClasses: () => apiRequest("/academics/classes"),
  createClass: (data: any) => apiRequest("/academics/classes", { method: "POST", body: JSON.stringify(data) }),
  getSections: () => apiRequest("/academics/sections"),
  getSubjects: () => apiRequest("/academics/subjects"),
  getTimetable: (classId?: string) => apiRequest(`/academics/timetable${classId ? `?classId=${classId}` : ""}`),
  getHomework: () => apiRequest("/academics/homework"),
  createHomework: (data: any) => apiRequest("/academics/homework", { method: "POST", body: JSON.stringify(data) }),
  getMaterials: () => apiRequest("/academics/materials"),
  getLessonPlans: () => apiRequest("/academics/lesson-plans"),

  // Attendance
  markStudentAttendance: (payload: any) => apiRequest("/attendance/student/mark", { method: "POST", body: JSON.stringify(payload) }),
  getClassAttendance: (params?: string) => apiRequest(`/attendance/student/class${params ? `?${params}` : ""}`),
  markTeacherAttendance: (payload: any) => apiRequest("/attendance/teacher/checkin", { method: "POST", body: JSON.stringify(payload) }),
  getAttendanceReport: () => apiRequest("/attendance/reports/monthly"),
  getAttendanceAnalytics: () => apiRequest("/attendance/analytics/overview"),

  // Exams
  getExams: () => apiRequest("/exams"),
  createExam: (data: any) => apiRequest("/exams/create", { method: "POST", body: JSON.stringify(data) }),
  getExamSchedule: () => apiRequest("/exams/schedule"),
  enterMarks: (data: any) => apiRequest("/exams/marks/entry", { method: "POST", body: JSON.stringify(data) }),
  getReportCard: (studentId: string) => apiRequest(`/exams/report-card/${studentId}`),
  publishResults: (data: any) => apiRequest("/exams/publish", { method: "POST", body: JSON.stringify(data) }),

  // Fees & Finance
  getFeeStructures: () => apiRequest("/fees/structure"),
  createFeeStructure: (data: any) => apiRequest("/fees/structure", { method: "POST", body: JSON.stringify(data) }),
  assignFeeStructure: (data: any) => apiRequest("/fees/assign", { method: "POST", body: JSON.stringify(data) }),
  collectFeePayment: (payload: any) => apiRequest("/fees/collect", { method: "POST", body: JSON.stringify(payload) }),
  getFeeReceipt: (receiptNo: string) => apiRequest(`/fees/receipt/${receiptNo}`),
  getCollectionsReport: () => apiRequest("/fees/reports/collections"),
  getDefaultersReport: () => apiRequest("/fees/reports/defaulters"),

  // Transport & Live GPS
  getBuses: () => apiRequest("/transport/buses"),
  createBus: (data: any) => apiRequest("/transport/buses", { method: "POST", body: JSON.stringify(data) }),
  getDrivers: () => apiRequest("/transport/drivers"),
  createDriver: (data: any) => apiRequest("/transport/drivers", { method: "POST", body: JSON.stringify(data) }),
  getRoutes: () => apiRequest("/transport/routes"),
  getStops: () => apiRequest("/transport/stops"),
  startTrip: (data: any) => apiRequest("/transport/trip/start", { method: "POST", body: JSON.stringify(data) }),
  endTrip: (data: any) => apiRequest("/transport/trip/end", { method: "POST", body: JSON.stringify(data) }),
  triggerSOS: (data: any) => apiRequest("/transport/sos/trigger", { method: "POST", body: JSON.stringify(data) }),
  getSOSAlerts: () => apiRequest("/transport/sos/alerts"),
  getLiveMapFleet: () => apiRequest("/gps/live-map"),

  // Notifications & Support Tickets
  getAnnouncements: () => apiRequest("/admin/announcements"),
  createAnnouncement: (payload: any) => apiRequest("/admin/announcements", { method: "POST", body: JSON.stringify(payload) }),
  sendPushNotification: (payload: any) => apiRequest("/notifications/push/send", { method: "POST", body: JSON.stringify(payload) }),
  getSupportTickets: () => apiRequest("/support/tickets"),
  createSupportTicket: (payload: any) => apiRequest("/support/tickets", { method: "POST", body: JSON.stringify(payload) }),

  // Settings
  getSchoolProfile: () => apiRequest("/settings/school"),
  updateSchoolProfile: (data: any) => apiRequest("/settings/school", { method: "PUT", body: JSON.stringify(data) }),
  getBranding: () => apiRequest("/settings/branding"),
  getAcademicSessions: () => apiRequest("/settings/academic-sessions"),
  getPermissionsMatrix: () => apiRequest("/settings/permissions"),
  triggerBackup: () => apiRequest("/settings/backup/trigger", { method: "POST" }),
  getAuditLogs: () => apiRequest("/settings/audit-logs"),
  getIntegrations: () => apiRequest("/settings/integrations"),
};
