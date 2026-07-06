import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (userId) {
    config.headers["X-User-ID"] = userId;
  }

  return config;
});

export const loginUser = (payload) => api.post("/auth/login", payload);
export const registerUser = (payload) => api.post("/auth/register", payload);

export const getActivities = () => api.get("/activities");
export const addActivity = (activity) => api.post("/activities", activity);
export const getActivityDetail = (id) =>
  api.get(`/recommendation/activity/${id}`);

export const generateRecommendation = (payload) =>
  api.post("/recommendation/generate", payload);
export const getRecommendation = (activityId) =>
  api.get(`/recommendation/activity/${activityId}`);

export const getAiSummaryRecommendation = (userId) =>
  api.get(`/recommendation/user/${userId}/summary`);
