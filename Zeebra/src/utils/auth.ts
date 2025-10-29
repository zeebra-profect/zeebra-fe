import { http } from "./http";

export interface LoginReq {
  identifier: string;
  password: string;
}

export interface LoginRes {
  accessToken: string;
  refreshToken?: string;
}

export async function login(req: LoginReq): Promise<LoginRes> {
  const { data } = await http.post<LoginRes>("/auth/login", req);
  return data;
}
