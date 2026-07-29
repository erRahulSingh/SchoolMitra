// ═══════════════════════════════════════════════════════════
// SchoolMitra — Unified API Client (Parent Mobile PWA)
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
