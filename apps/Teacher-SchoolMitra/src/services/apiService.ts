import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { notifyTeacherSchoolBlocked } from '../components/TeacherSchoolStatusGuard';

const getBaseUrls = (): string[] => {
  const urls: string[] = [];
  if (Platform.OS === 'android') {
    urls.push('http://10.0.2.2:5000/api/v1');
  }
  urls.push('http://localhost:5000/api/v1');
  urls.push('http://127.0.0.1:5000/api/v1');
  return urls;
};

// Generic Fetch with multi-host fallback & timeout
async function apiRequest<T = any>(endpoint: string, options: RequestInit = {}, timeoutMs = 8000): Promise<T> {
  const token = await AsyncStorage.getItem('teacherToken');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const baseUrls = getBaseUrls();
  let lastError: any = null;

  for (const baseUrl of baseUrls) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers,
        signal: controller.signal
      });
      clearTimeout(timer);

      const data = await response.json().catch(() => ({}));

      // ─── STEP 11: TEACHER APP TENANT STATUS INTERCEPTOR ───
      if (
        response.status === 403 ||
        data?.code === 'SCHOOL_ACCESS_SUSPENDED' ||
        data?.code === 'SCHOOL_ACCOUNT_EXPIRED' ||
        data?.code === 'SCHOOL_ACCOUNT_DEACTIVATED' ||
        data?.code === 'SESSION_INVALIDATED' ||
        data?.schoolStatus === 'SUSPENDED' ||
        data?.schoolStatus === 'EXPIRED' ||
        data?.schoolStatus === 'DEACTIVATED'
      ) {
        notifyTeacherSchoolBlocked({
          isBlocked: true,
          schoolStatus: data?.schoolStatus || 'SUSPENDED',
          code: data?.code || 'SCHOOL_ACCESS_SUSPENDED',
          message: data?.message || 'Your school account is currently unavailable. Please contact your School Admin/Super Admin.',
          schoolName: data?.schoolName || 'Your School'
        });
      }

      if (response.status === 401) {
        console.warn(`[API 401] Unauthorized on ${endpoint}`);
      }

      return (data?.data ?? data) as T;
    } catch (err: any) {
      clearTimeout(timer);
      lastError = err;
      // Try next baseUrl
    }
  }

  console.warn(`[API Network Error] ${endpoint}:`, lastError?.message || lastError);
  throw lastError || new Error(`Failed to fetch from ${endpoint}`);
}

// ─── STEP 35: OFFLINE SYNC VALIDATION & ANTI-BYPASS POLICY ───
export async function revalidateStatusBeforeSync(): Promise<boolean> {
  try {
    const sessionData = await apiRequest('/auth/session', { method: 'GET' });
    if (sessionData && (sessionData.school?.status === 'ACTIVE' || sessionData.school?.status === 'TRIAL')) {
      return true;
    }
    return false;
  } catch (err) {
    // Offline / unable to verify tenant status -> reject outbox flush
    return false;
  }
}

// ═══════════════════════════════════════════════════════════
// TEACHER APP API SERVICE SUITE (Full Dynamic Integration)
// ═══════════════════════════════════════════════════════════

export const teacherApi = {
  // 1. Dashboard API
  getDashboard: () => apiRequest('/teacher/dashboard'),

  // 2. Classes & Subjects API
  getClasses: () => apiRequest('/teacher/classes'),
  getClassById: (classId: string) => apiRequest(`/teacher/classes/${classId}`),
  getClassStudents: (classId: string) => apiRequest(`/teacher/classes/${classId}/students`),
  getSubjects: () => apiRequest('/teacher/subjects'),

  // 3. Students API
  getStudents: (classId?: string) => apiRequest(`/teacher/students${classId ? `?classId=${classId}` : ''}`),
  getStudentPerformance: (studentId: string) => apiRequest(`/teacher/students/${studentId}/performance`),

  // 4. Attendance API
  getAttendance: (date?: string, classId?: string) =>
    apiRequest(`/teacher/attendance?date=${date || ''}&classId=${classId || ''}`),
  saveAttendance: (payload: { classId?: string; sectionId?: string; date?: string; attendance?: any[]; students?: any[] }) =>
    apiRequest('/teacher/attendance', { method: 'POST', body: JSON.stringify(payload) }),
  requestAttendanceCorrection: (payload: { studentId: string; date: string; requestedStatus: string; reason: string }) =>
    apiRequest('/teacher/attendance/correction-request', { method: 'POST', body: JSON.stringify(payload) }),

  // 5. Homework API
  getHomework: () => apiRequest('/teacher/homework'),
  getHomeworkById: (id: string) => apiRequest(`/teacher/homework/${id}`),
  createHomework: (payload: any) =>
    apiRequest('/teacher/homework', { method: 'POST', body: JSON.stringify(payload) }),
  updateHomework: (id: string, payload: any) =>
    apiRequest(`/teacher/homework/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteHomework: (id: string) =>
    apiRequest(`/teacher/homework/${id}`, { method: 'DELETE' }),
  publishHomework: (id: string) =>
    apiRequest(`/teacher/homework/${id}/publish`, { method: 'POST' }),

  // 6. Assignments API
  getAssignments: () => apiRequest('/teacher/assignments'),
  getAssignmentById: (id: string) => apiRequest(`/teacher/assignments/${id}`),
  createAssignment: (payload: any) =>
    apiRequest('/teacher/assignments', { method: 'POST', body: JSON.stringify(payload) }),
  updateAssignment: (id: string, payload: any) =>
    apiRequest(`/teacher/assignments/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteAssignment: (id: string) =>
    apiRequest(`/teacher/assignments/${id}`, { method: 'DELETE' }),

  // 7. Study Materials API
  getMaterials: () => apiRequest('/teacher/materials'),
  uploadMaterial: (payload: any) =>
    apiRequest('/teacher/materials', { method: 'POST', body: JSON.stringify(payload) }),
  deleteMaterial: (id: string) =>
    apiRequest(`/teacher/materials/${id}`, { method: 'DELETE' }),

  // 8. Weekly Tests API
  getTests: () => apiRequest('/teacher/weekly-tests'),
  getTestById: (id: string) => apiRequest(`/teacher/weekly-tests/${id}`),
  createTest: (payload: any) =>
    apiRequest('/teacher/weekly-tests', { method: 'POST', body: JSON.stringify(payload) }),
  submitTestResults: (testId: string, results: any) =>
    apiRequest(`/teacher/weekly-tests/${testId}/results`, { method: 'POST', body: JSON.stringify(results) }),

  // 9. Exams & Marks API
  getExams: () => apiRequest('/teacher/exams'),
  getExamById: (examId: string) => apiRequest(`/teacher/exams/${examId}`),
  getExamStudents: (examId: string, classId?: string, sectionId?: string, subjectId?: string) =>
    apiRequest(`/teacher/exams/${examId}/students?classId=${classId || ''}&sectionId=${sectionId || ''}&subjectId=${subjectId || ''}`),
  saveExamMarks: (examId: string, payload: { classId: string; sectionId: string; subjectId: string; marksRoster: any[]; status?: string }) =>
    apiRequest(`/teacher/exams/${examId}/marks`, { method: 'POST', body: JSON.stringify(payload) }),

  // 10. Report Cards API
  getReportCards: () => apiRequest('/teacher/report-cards'),
  getStudentReportCard: (studentId: string) => apiRequest(`/teacher/report-cards/${studentId}`),
  submitReportCard: (studentId: string, data: any) =>
    apiRequest(`/teacher/report-cards/${studentId}/submit`, { method: 'POST', body: JSON.stringify(data) }),

  // 11. Messages & Announcements API
  getMessages: () => apiRequest('/teacher/messages'),
  sendMessage: (payload: { recipientId: string; message: string }) =>
    apiRequest('/teacher/messages', { method: 'POST', body: JSON.stringify(payload) }),
  getAnnouncements: () => apiRequest('/teacher/announcements'),
  createAnnouncement: (payload: { title: string; targetClass?: string; body: string }) =>
    apiRequest('/teacher/announcements', { method: 'POST', body: JSON.stringify(payload) }),

  // 12. Leaves API
  getLeaves: () => apiRequest('/teacher/leaves'),
  applyLeave: (payload: { type: string; startDate?: string; endDate?: string; dates?: string; reason: string; halfDay?: boolean }) =>
    apiRequest('/teacher/leave', { method: 'POST', body: JSON.stringify(payload) }),

  // 13. Timetable API
  getTimetable: () => apiRequest('/teacher/timetable'),
  getTodayTimetable: () => apiRequest('/teacher/timetable/today'),

  // 14. Notifications API
  getNotifications: () => apiRequest('/teacher/notifications'),
  markAllNotificationsRead: () => apiRequest('/teacher/notifications/read-all', { method: 'PATCH' }),

  // 15. Profile API
  getProfile: () => apiRequest('/teacher/profile'),
  getMe: () => apiRequest('/teacher/me'),
  updateProfile: (payload: any) =>
    apiRequest('/teacher/profile', { method: 'PUT', body: JSON.stringify(payload) }),
  changePassword: (payload: { oldPassword?: string; currentPassword?: string; newPassword: string }) =>
    apiRequest('/teacher/change-password', { method: 'PUT', body: JSON.stringify(payload) }),

  // 16. Permissions API
  getMyPermissions: () => apiRequest('/teacher/permissions')
};

