class NotificationSocket {
  url: string;
  socket: WebSocket | null;

  constructor(url: string) {
    this.url = url;
    this.socket = null;
  }

connect() {
  console.log("🔵 WebSocket 연결 시도...");
  
  this.socket = new WebSocket('ws://localhost:8080/ws/notification');

  this.socket.onopen = () => {
    console.log("✅ 웹소켓 연결됨");
  };

  this.socket.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    console.log("📨 받은 데이터: ", data);
  };

  this.socket.onerror = (error: Event) => {
    console.error("❌ 웹소켓 에러: ", error);
  };

  this.socket.onclose = () => {
    console.log("🔴 웹소켓 연결 끊김");
  };
}
  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

const notificationSocket = new NotificationSocket(
  "ws://localhost:8080/ws/notification"
);

export default notificationSocket;
