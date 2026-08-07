import { api } from "@/lib/api";
import { setAccessToken } from "./auth";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType?: string;
  expiresIn?: string | number;
}

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    credentials,
  );

  const data = response.data;

  setAccessToken(data.accessToken);

  return data;
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("vorqara_access_token");
  }
}