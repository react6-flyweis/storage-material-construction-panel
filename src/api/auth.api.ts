import { axiosInstance } from "./axiosInstance";

export const loginApi = (payload: {
  email?: string;
  password?: string;
  region: string;
  mobileNumber?: string;
}) => {
  return axiosInstance.post("/api/v1/user/loginWithPhone", payload);
};

export const loginWithEmailApi = (payload: {
  email?: string;
  password?: string;
}) => {
  return axiosInstance.post("/auth/login", payload);
};
export const signupApi = (payload: {
  rePassword?: string;
  region: string;
  email?: string;
  password?: string;
  mobileNumber?: string;
}) => {
  return axiosInstance.post("/api/v1/user/signup", payload);
};

export const refreshApi = (refreshToken: string) => {
  return axiosInstance.post("/auth/refresh", { refreshToken });
};

export const logoutApi = () => {
  return axiosInstance.post("/auth/logout");
};
