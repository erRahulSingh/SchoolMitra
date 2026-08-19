import { Platform } from 'react-native';

const getCandidateUrls = (endpoint: string) => {
  if (Platform.OS === 'android') {
    return [
      `http://10.0.2.2:5000/api/v1${endpoint}`,
      `http://localhost:5000/api/v1${endpoint}`,
      `http://127.0.0.1:5000/api/v1${endpoint}`
    ];
  }
  return [
    `http://localhost:5000/api/v1${endpoint}`,
    `http://127.0.0.1:5000/api/v1${endpoint}`
  ];
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const candidateUrls = getCandidateUrls(endpoint);
  let lastError: any = null;

  for (const url of candidateUrls) {
    try {
      const response = await fetch(url, options);
      return response;
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error("Failed to connect to backend server");
};
