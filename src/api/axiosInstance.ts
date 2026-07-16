import axios from "axios";
import type { AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
const TOKEN_KEY = "access_token";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem(TOKEN_KEY);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
