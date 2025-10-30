import { http } from "./http";

export interface NotiRes {
    noticeText: string;
    createdTime: string;
    notificationType: string;
    isRead: boolean;
}

export interface NotisRes {
  status: string;
  message: string;
  data: {
    dtos: NotiRes[];
  };
  sendTime: string;
}

export async function getNotifications(): Promise<NotisRes> {
  const { data } = await http.get<NotisRes>("/notification/all");
  return data;
}

export async function addNotification(): Promise<void> {
  await http.post("/notification");
}
