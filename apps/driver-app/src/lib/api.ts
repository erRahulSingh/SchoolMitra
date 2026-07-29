// ═══════════════════════════════════════════════════════════
// SchoolMitra — Unified API Client (Driver Cockpit App)
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
    console.warn(`[DriverApp API Error] ${endpoint}:`, err?.message || err);
    return {
      success: false,
      message: err?.message || "Network error. Telemetry in offline queue.",
    };
  }
}

export const driverApi = {
  login: (credentials: any) => apiRequest("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
  getAssignedBus: () => apiRequest("/transport/buses"),
  getRouteStops: () => apiRequest("/transport/routes"),
  logRfidTap: (payload: any) => apiRequest("/transport/rfid-logs", { method: "POST", body: JSON.stringify(payload) }),
  triggerEmergencySos: (payload: any) => apiRequest("/notifications/dispatch", { method: "POST", body: JSON.stringify({ ...payload, eventType: "emergency_alert" }) }),
};
