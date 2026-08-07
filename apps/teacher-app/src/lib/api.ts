const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export async function teacherApiRequest(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("teacher_access_token") : null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "An error occurred during network request",
        error: data.error,
        status: response.status
      };
    }

    return {
      success: true,
      ...data
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Unable to connect to SchoolMitra Server API",
    };
  }
}

export const teacherAuthApi = {
  login: (credentials: any) => teacherApiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ ...credentials, role: "teacher" })
  }),
  sendOtp: (data: any) => teacherApiRequest("/auth/send-otp", {
    method: "POST",
    body: JSON.stringify({ ...data, role: "teacher" })
  }),
  verifyOtp: (data: any) => teacherApiRequest("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify(data)
  }),
  forgotPassword: (data: any) => teacherApiRequest("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ ...data, role: "teacher" })
  }),
  resetPassword: (data: any) => teacherApiRequest("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(data)
  }),
};
