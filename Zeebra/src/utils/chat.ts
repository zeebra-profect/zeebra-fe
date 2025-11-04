import { http } from "./http";

type MessageType = "TEXT" | "IMAGE";
type RoomType = "GROUP" | "DM";

// 정렬 정보
interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

// 페이지 정보
interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

// 채팅 메시지
export interface ChatMessage {
  messageId: number;
  roomId: number;
  senderMemberId: number;
  senderName: string;
  profileImageUrl: string | null;
  messageType: MessageType;
  content: string;
  imageUrl: string | null;
  createdAt: string;
}

// 페이지네이션 데이터
export interface PageData {
  content: ChatMessage[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}

// API 응답
export interface ApiResponse<T> {
  status: "success" | "error";
  message: string | null;
  data: T;
  sendTime: string;
}

// 채팅방 생성/조회 요청
export interface ChatRoomReq {
  productId: number | null;
  saleId: number | null;
  chatRoomType: RoomType;
}

export interface DMChatRoomReq {
  memberId: number | null;
  chatRoomType: string;
}

export interface DMChatRoomRes {
  chatRoomId: number;
  lastMessageId: number;
  chatRoomType: RoomType;
  memberId: number;
}

// 채팅방 응답
export interface ChatRoomResponse {
  chatRoomId: number;
  productId: number;
  saleId: number;
  lastMessageId: number;
  chatRoomType: string;
}

// 채팅 히스토리 요청
export interface ChatHistoryReq {
  page?: number;
  size?: number;
  sort?: string;
}

export interface AllDmRoom {
  chatRoomId: number;
  roomName: string;
  roomProfileImageUrl: string;
  lastMessageContent: string;
  lastMessageTime: string;
  unreadCount: number;
  memberId: number;
}

export type ChatHistoryResponse = ApiResponse<PageData>;
export type DMChatRoomResponse = ApiResponse<DMChatRoomRes>;
export type DMChatRoomsResponse = ApiResponse<AllDmRoom[]>;

// API 함수들
export async function getChatHistory(
  roomId: number,
  req: ChatHistoryReq = { page: 0, size: 30, sort: "createdAt,desc" }
): Promise<ChatHistoryResponse> {
  const { data } = await http.get<ChatHistoryResponse>(
    `/chat/rooms/${roomId}/messages`,
    { params: req }
  );
  console.log("chatHistory: ", data);
  return data;
}

export async function getOrCreateChatRoom(
  req: ChatRoomReq
): Promise<ApiResponse<ChatRoomResponse>> {
  const { data } = await http.post<ApiResponse<ChatRoomResponse>>(
    `/chat/rooms`,
    req
  );
  console.log("roomdata: ", data);
  return data;
}

export async function getOrCreateDMChatRoom(
  req: DMChatRoomReq
): Promise<DMChatRoomResponse> {
  const { data } = await http.post<DMChatRoomResponse>(
    `/chat/rooms/dm/test`,
    req
  );
  console.log("dmroomdata: ", data);
  return data;
}

export async function getAllDMChatRoom(): Promise<DMChatRoomsResponse> {
  const { data } = await http.get<DMChatRoomsResponse>(
    `/chat/rooms/dm`);
  console.log("dmroomsssss: ", data);
  return data;
}
