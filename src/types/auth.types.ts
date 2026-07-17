export interface AuthPayload {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  role: string;
  user: User;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: LoginResponseData;
}
