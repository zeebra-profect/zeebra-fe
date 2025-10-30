class NotificationSocket {
  url: string;
  socket: WebSocket | null;

  constructor(url: string) {
    this.url = url;
    this.socket = null;
  }

  connect() {
    if (this.socket?.readyState === WebSocket.OPEN) {
      console.log("⚠️ 이미 연결됨");
      return;
    }

    this.socket = new WebSocket(this.url);

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

  send(data: unknown): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.warn("⚠️ 웹소켓이 연결되지 않음");
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

const notificationSocket = new NotificationSocket("ws://localhost:8080/api/notification");

export default notificationSocket;