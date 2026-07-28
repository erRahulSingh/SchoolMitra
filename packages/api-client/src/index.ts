export const API_BASE_URL = "http://localhost:5000/api/v1";

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });
  return res.json();
};
