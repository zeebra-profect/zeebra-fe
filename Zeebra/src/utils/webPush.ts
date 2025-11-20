import type { ApiResponse } from "./cart";
import { http } from "@/utils/http";

export interface PushRequest {
  endpoint: string;
  p256dh: string;
  auth: string;
  deviceInfo: string;
}

export type PushStatusResponse = ApiResponse<boolean>;
export type PushResultResponse = ApiResponse<string>;

export async function getStatus(): Promise<PushStatusResponse> {
  const { data } = await http.get<PushStatusResponse>("/push/status");
  return data;
}

export async function subscribe(req: PushRequest): Promise<void> {
  const { data } = await http.post(`/push`, req);
  return data;
}

export async function unsubscribe(): Promise<void> {
  const { data } = await http.delete(`/push`);
  return data;
}
