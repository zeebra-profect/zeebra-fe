import { http } from "./http";

export interface LoginReq {
  identifier: string;
  password: string;
}

export async function login(data: LoginReq): Promise<void> {
  await http.post("/auth/login", data);
}

// members/me 호출 refetch에 활용됨
export async function getMe() {
  const res = await http.get("/members/me");
  return res.data;
}

export async function logout() {
  await http.post("/auth/logout");
}
