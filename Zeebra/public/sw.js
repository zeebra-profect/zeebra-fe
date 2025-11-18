// public/sw.js

// 1. 푸시 메시지 수신 시 실행
self.addEventListener("push", function (event) {
  console.log("푸시 메시지 받음!", event);

  // 백엔드에서 보낸 데이터
  const data = event.data.json();
  console.log("data?: ", data);
  // data = { title: "새 댓글", body: "홍길동님이 댓글을 남겼습니다" }

  const options = {
    body: data.body,
    vibrate: [200, 100, 200],
    requireInteraction: true, // 화면에 알림이 계속 유지되도록
    data: {
    //   url: data.url || "/",
    },
  };
  event.waitUntil(
    self.registration.showNotification("테스트 알림", {
      body: "푸시 시스템 테스트 중",
      requireInteraction: true
    })
  );

  // 알림 표시
//   event.waitUntil(self.registration.showNotification(data.title, options));
});

// 2. 알림 클릭 시 실행
self.addEventListener("notificationclick", function (event) {
  console.log("알림 클릭됨!", event);

  // 알림 닫기
  event.notification.close();

  // 특정 URL로 이동 (새 탭 또는 기존 탭)
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

// 3. Service Worker 설치 (선택)
self.addEventListener("install", function (event) {
  console.log("Service Worker 설치됨");
  self.skipWaiting(); // 즉시 활성화
});

// 4. Service Worker 활성화 (선택)
self.addEventListener("activate", function (event) {
  console.log("Service Worker 활성화됨");
});
