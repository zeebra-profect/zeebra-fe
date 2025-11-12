import type { ApiResponse } from "./cart";
import { http } from "./http";

type NotificationType = "SIGN_UP" | "LOGIN" | "PAYMENT_FAILED" | "ORDER_CONFIRMED" | "ORDER_SHIPPED" | "ORDER_DELIVERED" | "WISHLIST_RESTOCK" | "WISHLIST_LOW_STOCK"
| "REVIEW_REQUEST" | "NEW_CHAT" | "NEW_MESSAGE" | "TEST" | "TEST_OBJECT";

export interface NotificationRequest {
  memberId: number;
  notificationType: NotificationType;
  object?: unknown 
}

export interface NotificationResponse {
  notificationId: number;
  memberId: number;
  notificationType: NotificationType;
  isRead: boolean;
  noticeText: string;
  createdTime: string;
  url: string;
}



export type NotificationResponses = ApiResponse<NotificationResponse[]>;

export async function getNotifications(): Promise<NotificationResponses> {
  const { data } = await http.get<NotificationResponses>("/notification");
  return data;
}

export async function postNotification(req: NotificationRequest): Promise<NotificationResponses> {
  const { data } = await http.post(`/notification`, req);
  return data;
}
