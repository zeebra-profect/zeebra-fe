class NotificationSocket {
  url: string;
  socket: WebSocket | null;

  // 생성자. 처음 생성 시 socket은 비워져 있음.
  constructor(url: string) {
    this.url = url;
    this.socket = null;
  }

  // 연결하면 소켓이 채워짐. 이벤트 핸들러 등록
  connect() {
    this.socket = new WebSocket(this.url);

    // 연결되면 실행
    this.socket.onopen = () => {
      console.log("웹소켓 연결됨");
    };

    // 메시지 오면 실행
    this.socket.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log("data: ", data);
    };

    // 에러 나면 실행
    this.socket.onerror = (error: Event) => {
      console.error("웹소켓 에러: ", error);
    };

    // 연결 끊기면 실행
    this.socket.onclose = () => {
      console.log("웹소켓 연결 끊김");
    };
  }

  // 데이터 보내기
  send(data: unknown): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  }
}

export default new NotificationSocket("ws://localhost:8080/api/notification");
