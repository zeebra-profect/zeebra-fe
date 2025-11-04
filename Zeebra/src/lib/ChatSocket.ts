import SockJS from "sockjs-client";
import { Client, type IMessage } from "@stomp/stompjs";
import type { ChatMessage } from "@/utils/chat";

class ChatWebSocket {
  private client: Client | null = null;

  connect() {
    // SockJS 연결 - 쿠키 자동 전송
    const socket = new SockJS("http://localhost:8080/ws/chat");

    this.client = new Client({
      webSocketFactory: () => socket as unknown,
      debug: (str) => {
        console.log("STOMP: " + str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = () => {
      console.log("✅ WebSocket 연결 성공");
    };

    this.client.onStompError = (frame) => {
      console.error("❌ STOMP 에러:", frame);
    };

    this.client.activate();
  }

  isConnected(): boolean {
    return this.client?.connected === true;
  }

  // 채팅방 구독
  subscribe(roomId: number, callback: (message: ChatMessage) => void) {
    if (!this.client) {
      console.error("WebSocket not connected");
      return;
    }

    this.client.subscribe(`/sub/chat/room/${roomId}`, (message: IMessage) => {
      const chatMessage = JSON.parse(message.body);
      callback(chatMessage);
    });
  }

  // 메시지 전송
  sendMessage(
    chatRoomId: number,
    content: string,
    messageType: "TEXT" | "IMAGE" = "TEXT",
    imageUrl?: string
  ) {
    console.log("1. 전송 시도:", { chatRoomId, content, messageType });

    if (!this.client) {
      console.error("❌ client 없음");
      return;
    }

    if (!this.client.connected) {
      console.error("❌ 연결 안 됨");
      return;
    }

    console.log("2. 전송 중...");

    this.client.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify({
        chatRoomId,
        messageType,
        content,
        imageUrl: imageUrl || null,
      }),
    });

    console.log("3. 전송 완료!");
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
    }
  }
}

export const chatWebSocket = new ChatWebSocket();
