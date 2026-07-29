// ═══════════════════════════════════════════════════════════
// SchoolMitra — Unified API Client (Super Admin Console)
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
    console.warn(`[SuperAdmin API Error] ${endpoint}:`, err?.message || err);
    return {
      success: false,
      message: err?.message || "Network error. Using telemetry offline fallback.",
    };
  }
}

export const superAdminApi = {
  // Telemetry & Health
  getHealth: () => apiRequest("/health"),

  // Schools / Tenants
  getSchools: (query?: string) => apiRequest(`/schools${query ? `?${query}` : ""}`),
  createSchool: (schoolData: any) => apiRequest("/schools", { method: "POST", body: JSON.stringify(schoolData) }),
  getSchoolDossier: (id: string) => apiRequest(`/schools/${id}`),
  toggleSchoolStatus: (id: string, status: string) => apiRequest(`/schools/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  deleteSchool: (id: string) => apiRequest(`/schools/${id}`, { method: "DELETE" }),

  // Subscriptions & Revenue
  getReceipts: () => apiRequest("/fees/receipts"),
  getFeeDueReport: () => apiRequest("/fees/due-report"),

  // Staff Users & Auth
  getUsers: () => apiRequest("/auth/roles"),
};
