import axios, { type InternalAxiosRequestConfig } from "axios";

/**
 * Shared Axios instance.
 * In dev, Vite proxies /api → http://localhost:3000.
 * Attach demo token from localStorage on every request.
 */
const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// Attach auth token if present
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("hackoblast_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
