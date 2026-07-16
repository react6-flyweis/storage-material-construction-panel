import { axiosInstance } from "./axiosInstance";

export const loginApi = (payload: {
  email?: string;
  password?: string;
  region: string;
  mobileNumber?: string;
}) => {
  return axiosInstance.post("/api/v1/user/loginWithPhone", payload);
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
