import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { notifyParentSchoolBlocked } from "../components/ParentSchoolStatusGuard";

// Primary host IP for Expo on local Wi-Fi / LAN, emulator, or web
const DEFAULT_LAN_IP = "192.168.1.5";
const DEFAULT_PORT = "5000";

let cachedBaseUrl: string | null = null;

export const getApiBaseUrl = async (): Promise<string> => {
  if (cachedBaseUrl) return cachedBaseUrl;

  try {
    const customUrl = await AsyncStorage.getItem("custom_api_base_url");
    if (customUrl) {
      cachedBaseUrl = customUrl;
      return customUrl;
    }
  } catch {}

  if (Platform.OS === "android") {
    // 192.168.1.5 reaches the host PC running backend from Expo Go on phone or emulator
    cachedBaseUrl = `http://${DEFAULT_LAN_IP}:${DEFAULT_PORT}/api/v1`;
  } else if (Platform.OS === "ios") {
    cachedBaseUrl = `http://${DEFAULT_LAN_IP}:${DEFAULT_PORT}/api/v1`;
  } else {
    cachedBaseUrl = `http://localhost:${DEFAULT_PORT}/api/v1`;
  }

  return cachedBaseUrl;
};

export const setCustomApiBaseUrl = async (url: string) => {
  cachedBaseUrl = url;
  await AsyncStorage.setItem("custom_api_base_url", url);
};

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; [key: string]: any }> {
  try {
    const baseUrl = await getApiBaseUrl();
    const token = await AsyncStorage.getItem("accessToken");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    const json = await res.json().catch(() => ({}));

    // ─── PARENT APP TENANT STATUS INTERCEPTOR ───
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
        message:
          json.message ||
          "Your school's account is currently inactive. Please contact the school administration.",
        schoolName: json.schoolName || "Your School",
      });
    }

    if (!res.ok && !json.message) {
      json.message = `Request failed with status ${res.status}`;
    }

    return json;
  } catch (err: any) {
    console.warn(`[ParentApp API Error] ${endpoint}:`, err?.message || err);
    return {
      success: false,
      message: err?.message || "Cannot connect to server. Please check your network connection.",
    };
  }
}

export const parentApi = {
  // Auth
  register: (payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
    relation?: string;
    schoolCode?: string;
    childName?: string;
    studentAdmissionNo?: string;
    childClass?: string;
    studentId?: string;
    rollNo?: string;
  }) =>
    apiRequest("/auth/parent/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  login: (credentials: { email?: string; phone?: string; password: string }) =>
    apiRequest("/auth/parent/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  // Dynamic School & Student Discovery
  getSchools: (search?: string) =>
    apiRequest(`/auth/schools${search ? "?search=" + encodeURIComponent(search) : ""}`),

  lookupStudents: (params: { schoolId?: string; schoolCode?: string; query: string }) => {
    const qs = new URLSearchParams(params as any).toString();
    return apiRequest(`/auth/students/lookup?${qs}`);
  },

  // Children & Profile
  getParentChildren: (parentId: string) => apiRequest(`/parents/${parentId}/children`),
  getStudentDossier: (studentId: string) => apiRequest(`/students/${studentId}`),

  // Live Bus Tracking & Telemetry
  getBusLocations: () => apiRequest("/transport/buses"),
  getMapConfig: () => apiRequest("/transport/map-config"),
  getStudentAssignments: () => apiRequest("/transport/student-assignments"),
  getLiveTransport: () => apiRequest("/transport/live"),
  getRoutes: () => apiRequest("/transport/routes"),
  getStops: () => apiRequest("/transport/stops"),

  // Attendance & Fees
  getStudentAttendanceSummary: (studentId: string) =>
    apiRequest(`/attendance/student/summary?studentId=${studentId}`),
  getStudentFeeInvoices: (studentId: string) =>
    apiRequest(`/fees/invoices?studentId=${studentId}`),
  payFeeInvoice: (payload: any) =>
    apiRequest("/fees/payments/collect", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  // Notifications
  getInbox: () => apiRequest("/notifications/inbox"),
  markAsRead: (id: string) => apiRequest(`/notifications/${id}/read`, { method: "PATCH" }),
};
