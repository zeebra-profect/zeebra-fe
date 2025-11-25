import SockJS from "sockjs-client";
import { Client, type IMessage } from "@stomp/stompjs";
import type { ChatMessage } from "@/utils/chat";

class ChatWebSocket {
  private client: Client | null = null;
  private apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  connect() {
    // SockJS 연결 - 쿠키 자동 전송
    const wsUrl = this.apiBaseUrl
    .replace(/^http/, 'ws') // http를 ws로 변경
    .replace(/^https/, 'wss') // https를 wss로 변경
    + '/ws/chat'; // 웹소켓 엔드포인트 경로 추가
    
    const socket = new SockJS(wsUrl, null, {
        // SockJS가 HTTP 핸드셰이크 시 쿠키를 전송하도록 보장합니다.
        withCredentials: false
    }as any);

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
  messageType: 'TEXT' | 'IMAGE' = 'TEXT',
  imageUrl?: string
) {
  console.log('1. 전송 시도:', { chatRoomId, content, messageType });
  
  if (!this.client) {
    console.error('❌ client 없음');
    return;
  }
  
  if (!this.client.connected) {
    console.error('❌ 연결 안 됨');
    return;
  }
  
  console.log('2. 전송 중...');

  this.client.publish({
    destination: '/pub/chat/message',
    body: JSON.stringify({
      chatRoomId,
      messageType,
      content,
      imageUrl: imageUrl || null
    }),
  });
  
  console.log('3. 전송 완료!');
}

  disconnect() {
    if (this.client) {
      this.client.deactivate();
    }
  }
}

export const chatWebSocket = new ChatWebSocket();
