import type { ApiResponse } from "./cart";
import { http } from "./http";

export const NotificationType = {
  SIGN_UP: "SIGN_UP",
  LOGIN: "LOGIN",
  PAYMENT_FAILED: "PAYMENT_FAILED",
  ORDER_CONFIRMED: "ORDER_CONFIRMED",
  ORDER_SHIPPED: "ORDER_SHIPPED",
  ORDER_DELIVERED: "ORDER_DELIVERED",
  WISHLIST_RESTOCK: "WISHLIST_RESTOCK",
  WISHLIST_LOW_STOCK: "WISHLIST_LOW_STOCK",
  REVIEW_REQUEST: "REVIEW_REQUEST",
  NEW_CHAT: "NEW_CHAT",
  NEW_MESSAGE: "NEW_MESSAGE",
  TEST: "TEST",
  TEST_OBJECT: "TEST_OBJECT",
} as const;

export type NotificationType = typeof NotificationType[keyof typeof NotificationType];

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

export interface NotificationResponses {
  dtos: Array<NotificationResponse>
}

export type NotificationApiResponse = ApiResponse<NotificationResponses>;

export async function getNotifications(): Promise<NotificationApiResponse> {
  const { data } = await http.get<NotificationApiResponse>("/notification");
  return data;
}

export async function postNotification(req: NotificationRequest): Promise<ApiResponse<NotificationResponse>> {
  const { data } = await http.post(`/notification`, req);
  return data;
}

export async function putNotification(notificationId: number): Promise<ApiResponse> {
  const { data } = await http.put(`/notification/${notificationId}`);
  return data;
}

export async function deleteNotification(notificationId: number): Promise<NotificationApiResponse> {
  const { data } = await http.delete(`/notification/${notificationId}`);
  return data;
}