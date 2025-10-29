import { http } from "./http";

export interface LoginRes {
  accessToken: string;
  refreshToken?: string;
}

export async function loginApi(identifier: string, password: string) {
  const { data } = await http.post<LoginRes>("/api/auth/login", {
    identifier,
    password,
  });
  return data;
}
