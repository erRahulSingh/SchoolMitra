import AsyncStorage from '@react-native-async-storage/async-storage';
import { notifyDriverSchoolBlocked } from '../components/DriverSchoolStatusGuard';

const API_BASE_URL = 'http://localhost:5000/api/v1';

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; [key: string]: any }> {
  try {
    const token = await AsyncStorage.getItem('accessToken');

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const json = await res.json().catch(() => ({}));

    // ─── STEP 13: DRIVER APP TENANT STATUS INTERCEPTOR ───
    if (
      res.status === 403 ||
      json.code === 'SCHOOL_ACCESS_SUSPENDED' ||
      json.code === 'SCHOOL_ACCOUNT_EXPIRED' ||
      json.code === 'SCHOOL_ACCOUNT_DEACTIVATED' ||
      json.code === 'SESSION_INVALIDATED' ||
      json.schoolStatus === 'SUSPENDED' ||
      json.schoolStatus === 'EXPIRED' ||
      json.schoolStatus === 'DEACTIVATED'
    ) {
      notifyDriverSchoolBlocked({
        isBlocked: true,
        schoolStatus: json.schoolStatus || 'SUSPENDED',
        code: json.code || 'SCHOOL_ACCESS_SUSPENDED',
        message: json.message || 'Transport services are currently unavailable. Please contact the School Administration.',
        schoolName: json.schoolName || 'Your School'
      });
    }

    return json;
  } catch (err: any) {
    console.warn(`[DriverApp API Error] ${endpoint}:`, err?.message || err);
    return {
      success: false,
      message: err?.message || 'Network error. Operating in offline telemetry mode.',
    };
  }
}

export const driverApi = {
  login: (credentials: any) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getAssignedBus: () => apiRequest('/transport/buses'),
  getRouteStops: () => apiRequest('/transport/routes'),
  logRfidTap: (payload: any) => apiRequest('/transport/rfid-logs', { method: 'POST', body: JSON.stringify(payload) }),
  triggerEmergencySos: (payload: any) => apiRequest('/notifications/dispatch', { method: 'POST', body: JSON.stringify({ ...payload, eventType: 'emergency_alert' }) }),
};
