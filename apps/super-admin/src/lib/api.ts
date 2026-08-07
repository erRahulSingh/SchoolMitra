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
  getSuperAdminMetrics: () => apiRequest("/admin/super-dashboard"),

  // Schools / Tenants
  getSchools: (query?: string) => apiRequest(`/schools${query ? `?${query}` : ""}`),
  createSchool: (schoolData: any) => apiRequest("/schools", { method: "POST", body: JSON.stringify(schoolData) }),
  getSchoolDossier: (id: string) => apiRequest(`/schools/${id}`),
  toggleSchoolStatus: (id: string, status: string) => apiRequest(`/schools/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  deleteSchool: (id: string) => apiRequest(`/schools/${id}`, { method: "DELETE" }),

  // Subscriptions & Revenue
  getReceipts: () => apiRequest("/fees/receipts"),
  getFeeDueReport: () => apiRequest("/fees/due-report"),
  getRevenueAnalytics: () => apiRequest("/admin/revenue-analytics"),
  getSubscriptionsData: () => apiRequest("/admin/subscriptions-data"),
  renewSubscription: (id: string, planData?: any) => apiRequest(`/admin/subscriptions-renew/${id}`, { method: "POST", body: JSON.stringify(planData || {}) }),
  getCoupons: () => apiRequest("/admin/coupons"),
  createCoupon: (couponData: any) => apiRequest("/admin/coupons", { method: "POST", body: JSON.stringify(couponData) }),
  toggleCouponStatus: (code: string) => apiRequest(`/admin/coupons/${code}/toggle`, { method: "PATCH" }),
  deleteCoupon: (code: string) => apiRequest(`/admin/coupons/${code}`, { method: "DELETE" }),
  getPayments: () => apiRequest("/admin/payments"),
  processPaymentRefund: (id: string, reasonData: any) => apiRequest(`/admin/payments-refund/${id}`, { method: "POST", body: JSON.stringify(reasonData) }),
  dispatchGatewayEvent: (logData: any) => apiRequest("/admin/gateway-dispatch", { method: "POST", body: JSON.stringify(logData) }),
  getSaaSInvoices: () => apiRequest("/admin/invoices"),
  createSaaSInvoice: (invoiceData: any) => apiRequest("/admin/invoices", { method: "POST", body: JSON.stringify(invoiceData) }),
  markSaaSInvoicePaid: (id: string) => apiRequest(`/admin/invoices/${id}/pay`, { method: "PATCH" }),
  getSaaSPlans: () => apiRequest("/admin/saas-plans"),
  saveSaaSPlan: (planData: any) => apiRequest("/admin/saas-plans", { method: "POST", body: JSON.stringify(planData) }),
  deleteSaaSPlan: (id: string) => apiRequest(`/admin/saas-plans/${id}`, { method: "DELETE" }),
  getFeatureToggles: () => apiRequest("/admin/feature-toggles"),
  toggleFeatureFlag: (id: string) => apiRequest(`/admin/feature-toggles/${id}/toggle`, { method: "PATCH" }),
  createFeatureFlag: (flagData: any) => apiRequest("/admin/feature-toggles", { method: "POST", body: JSON.stringify(flagData) }),
  getSupportTickets: () => apiRequest("/admin/support-tickets"),
  createSupportTicket: (ticketData: any) => apiRequest("/admin/support-tickets", { method: "POST", body: JSON.stringify(ticketData) }),
  updateSupportTicket: (id: string, updateData: any) => apiRequest(`/admin/support-tickets/${id}`, { method: "PATCH", body: JSON.stringify(updateData) }),
  sendSupportChatMessage: (chatData: any) => apiRequest("/admin/support-chat", { method: "POST", body: JSON.stringify(chatData) }),
  getAnnouncements: () => apiRequest("/admin/announcements"),
  createAnnouncement: (announcementData: any) => apiRequest("/admin/announcements", { method: "POST", body: JSON.stringify(announcementData) }),
  deleteAnnouncement: (id: string) => apiRequest(`/admin/announcements/${id}`, { method: "DELETE" }),
  getAnalyticsCohorts: () => apiRequest("/admin/analytics-cohorts"),
  getGlobalNotifications: () => apiRequest("/admin/global-notifications"),
  createGlobalNotification: (logData: any) => apiRequest("/admin/global-notifications", { method: "POST", body: JSON.stringify(logData) }),
  deleteGlobalNotification: (id: string) => apiRequest(`/admin/global-notifications/${id}`, { method: "DELETE" }),
  getServerHealth: () => apiRequest("/admin/server-health"),
  getStorageUsage: () => apiRequest("/admin/storage-usage"),
  getDatabaseBackups: () => apiRequest("/admin/backups"),
  triggerDatabaseBackup: () => apiRequest("/admin/backups-trigger", { method: "POST" }),
  deleteDatabaseBackup: (id: string) => apiRequest(`/admin/backups/${id}`, { method: "DELETE" }),
  getAuditLogs: () => apiRequest("/admin/audit-logs"),
  getSystemActivityLogs: () => apiRequest("/admin/activity-logs"),
  getGlobalSettings: () => apiRequest("/admin/global-settings"),
  saveGlobalSettings: (settingsData: any) => apiRequest("/admin/global-settings", { method: "POST", body: JSON.stringify(settingsData) }),

  // Staff Users & System Admins
  getUsers: () => apiRequest("/admin/users"),
  createUser: (userData: any) => apiRequest("/admin/users", { method: "POST", body: JSON.stringify(userData) }),
  deleteUser: (id: string) => apiRequest(`/admin/users/${id}`, { method: "DELETE" }),
};
