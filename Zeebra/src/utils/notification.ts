import { http } from "./http";

export interface NotiRes {
  status: string;
  message: string;
  data: {
    notificationType: string;
    text: string;
    isRead: boolean;
    createdTime: string;
  };
  sendTime: string;
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
  const { data } = await http.get<NotisRes>("/notification/broadcast");
  return data;
}
