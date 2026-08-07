import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:5000/api/v1';

// Generic Fetch Wrapper
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = await AsyncStorage.getItem('teacherToken');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.log(`[API Error] ${endpoint}:`, error);
    throw error;
  }
}

// ═══════════════════════════════════════════════════════════
// TEACHER APP API SERVICE SUITE (13 API MODULES)
// ═══════════════════════════════════════════════════════════

export const teacherApi = {
  // 1. Dashboard API
  getDashboard: () => apiRequest('/teacher/dashboard'),

  // 2. Classes API
  getClasses: () => apiRequest('/teacher/classes'),
  getClassById: (classId: string) => apiRequest(`/teacher/classes/${classId}`),

  // 3. Students API
  getStudents: (classId?: string) => apiRequest(`/teacher/students${classId ? `?classId=${classId}` : ''}`),
  getStudentPerformance: (studentId: string) => apiRequest(`/teacher/students/${studentId}/performance`),

  // 4. Attendance API
  getAttendance: (date?: string, classId?: string) =>
    apiRequest(`/teacher/attendance?date=${date || ''}&classId=${classId || ''}`),
  saveAttendance: (payload: { classId: string; sectionId: string; date: string; attendance: any[] }) =>
    apiRequest('/teacher/attendance', { method: 'POST', body: JSON.stringify(payload) }),

  // 5. Homework API
  getHomework: () => apiRequest('/teacher/homework'),
  createHomework: (payload: any) =>
    apiRequest('/teacher/homework', { method: 'POST', body: JSON.stringify(payload) }),

  // 6. Assignments API
  getAssignments: () => apiRequest('/teacher/assignments'),
  createAssignment: (payload: any) =>
    apiRequest('/teacher/assignments', { method: 'POST', body: JSON.stringify(payload) }),

  // 7. Study Materials API
  getMaterials: () => apiRequest('/teacher/materials'),
  uploadMaterial: (payload: any) =>
    apiRequest('/teacher/materials', { method: 'POST', body: JSON.stringify(payload) }),

  // 8. Weekly Tests API
  getTests: () => apiRequest('/teacher/weekly-tests'),
  createTest: (payload: any) =>
    apiRequest('/teacher/weekly-tests', { method: 'POST', body: JSON.stringify(payload) }),
  submitTestResults: (testId: string, results: any) =>
    apiRequest(`/teacher/weekly-tests/${testId}/results`, { method: 'POST', body: JSON.stringify(results) }),

  // 9. Exams & Marks API
  getExams: () => apiRequest('/teacher/exams'),
  saveExamMarks: (examId: string, marks: any) =>
    apiRequest(`/teacher/exams/${examId}/marks`, { method: 'POST', body: JSON.stringify(marks) }),

  // 10. Report Cards API
  getReportCards: () => apiRequest('/teacher/report-cards'),
  publishReportCards: (payload: { classId: string; term: string }) =>
    apiRequest('/teacher/report-cards/publish', { method: 'POST', body: JSON.stringify(payload) }),

  // 11. Parent Messages & Notices API
  getMessages: () => apiRequest('/teacher/messages'),
  sendMessage: (payload: { recipientId: string; message: string }) =>
    apiRequest('/teacher/messages', { method: 'POST', body: JSON.stringify(payload) }),
  postAnnouncement: (payload: { title: string; targetClass: string; body: string }) =>
    apiRequest('/teacher/announcements', { method: 'POST', body: JSON.stringify(payload) }),

  // 12. Teacher Profile API
  getProfile: () => apiRequest('/teacher/profile'),
  updateProfile: (payload: any) =>
    apiRequest('/teacher/profile', { method: 'PUT', body: JSON.stringify(payload) })
};
