import { http } from "./http";

export interface NotiRes {
  notificationType: string;
  isRead: boolean;
}

export interface NotisRes {
  dtos: NotiRes[];
}


export async function getNotifications(): Promise<NotisRes> {
  const { data } = await http.get<NotisRes>("/notification/all");
  return data;
}
