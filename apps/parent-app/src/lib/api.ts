import { notifyParentSchoolBlocked } from "../components/ParentSchoolStatusGuard";

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

    const json = await res.json().catch(() => ({}));

    // ─── STEP 12: PARENT APP TENANT STATUS INTERCEPTOR ───
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
      notifyParentSchoolBlocked({
        isBlocked: true,
        schoolStatus: json.schoolStatus || "SUSPENDED",
        code: json.code || "SCHOOL_ACCESS_SUSPENDED",
        message: json.message || "Your school's account is currently inactive. Please contact the school administration.",
        schoolName: json.schoolName || "Your School"
      });
    }

    return json;
  } catch (err: any) {
    console.warn(`[ParentApp API Error] ${endpoint}:`, err?.message || err);
    return {
      success: false,
      message: err?.message || "Network error. Using offline mode.",
    };
  }
}

export const parentApi = {
  // Auth & Children
  login: (credentials: any) => apiRequest("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
  getParentChildren: (parentId: string) => apiRequest(`/parents/${parentId}/children`),
  getStudentDossier: (studentId: string) => apiRequest(`/students/${studentId}`),

  // Live Bus Tracking & Telemetry
  getBusLocations: () => apiRequest("/transport/buses"),

  // Attendance & Fees
  getStudentAttendanceSummary: (studentId: string) => apiRequest(`/attendance/student/summary?studentId=${studentId}`),
  getStudentFeeInvoices: (studentId: string) => apiRequest(`/fees/invoices?studentId=${studentId}`),
  payFeeInvoice: (payload: any) => apiRequest("/fees/payments/collect", { method: "POST", body: JSON.stringify(payload) }),

  // Notifications
  getInbox: () => apiRequest("/notifications/inbox"),
  markAsRead: (id: string) => apiRequest(`/notifications/${id}/read`, { method: "PATCH" }),
};
