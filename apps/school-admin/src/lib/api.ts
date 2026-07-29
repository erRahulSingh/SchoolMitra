// ═══════════════════════════════════════════════════════════
// SchoolMitra — Unified API Client (School Admin ERP)
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
  
  // Dashboard & Health
  getHealth: () => apiRequest("/health"),
  
  // Students
  getStudents: (params?: string) => apiRequest(`/students${params ? `?${params}` : ""}`),
  createStudent: (studentData: any) => apiRequest("/students", { method: "POST", body: JSON.stringify(studentData) }),
  getStudentById: (id: string) => apiRequest(`/students/${id}`),

  // Teachers
  getTeachers: () => apiRequest("/teachers"),
  createTeacher: (teacherData: any) => apiRequest("/teachers", { method: "POST", body: JSON.stringify(teacherData) }),

  // Attendance
  markAttendance: (payload: any) => apiRequest("/attendance/student/mark", { method: "POST", body: JSON.stringify(payload) }),
  getAttendanceReport: () => apiRequest("/attendance/report"),

  // Fees
  getFeeInvoices: () => apiRequest("/fees/invoices"),
  collectFeePayment: (payload: any) => apiRequest("/fees/payments/collect", { method: "POST", body: JSON.stringify(payload) }),
  getFeeDueReport: () => apiRequest("/fees/due-report"),

  // Transport
  getBuses: () => apiRequest("/transport/buses"),
  getDrivers: () => apiRequest("/transport/drivers"),
  getRoutes: () => apiRequest("/transport/routes"),
  getPickupLogs: () => apiRequest("/transport/rfid-logs"),

  // Notifications & Announcements
  getAnnouncements: () => apiRequest("/notifications/broadcasts"),
  createAnnouncement: (payload: any) => apiRequest("/notifications/broadcast", { method: "POST", body: JSON.stringify(payload) }),
};
