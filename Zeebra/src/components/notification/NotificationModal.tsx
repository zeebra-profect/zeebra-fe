import { useEffect, useState } from "react";
import {
  createNotification,
  deleteNotification,
  fetchNotifications,
  readNotification,
} from "../../store/notificationSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  NotificationType,
  type NotificationRequest,
} from "@/utils/notification";
import { fetchWebPushStatus, subscribe } from "@/store/webPushSlice";
import { unsubscribe } from "@/store/webPushSlice";
import type { PushRequest } from "@/utils/webPush";
import { registerServiceWorker } from "@/utils/serviceWorker";
import NotificationItem from "./NotificationItem";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasUnreadNoti: (value: boolean) => void;
}

function NotificationModal({ isOpen, onClose, hasUnreadNoti }: ModalProps) {
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const notificationSelector = useAppSelector(
    (state) => state.notification.notification?.data?.dtos
  );
  const pushSelector = useAppSelector((state) => state.push.push?.data);

  useEffect(() => {
    dispatch(fetchNotifications());
    dispatch(fetchWebPushStatus());
  }, []);

  const me = useAppSelector((state) => state.auth.me);

  const createTestNoti = () => {
    const form: NotificationRequest = {
      memberId: Number(me?.memberId),
      notificationType: NotificationType.TEST,
      object: null,
      imgUrl: null,
    };

    dispatch(createNotification(form));
  };

  const togglePushSubscription = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      if (pushSelector?.valueOf()) {
        // 구독 해제
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();

        if (subscription) {
          await subscription.unsubscribe();
        }

        await dispatch(unsubscribe()).unwrap();
        alert("푸시 알림이 해제되었습니다");
      } else {
        // 구독
        // 1. 권한 요청
        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
          alert("알림 권한을 허용해주세요");
          return;
        }

        // 2. Service Worker 등록 (없으면)
        await registerServiceWorker();

        // 3. 푸시 구독
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            import.meta.env.VITE_VAPID_PUBLIC_KEY
          ),
        });

        // 4. 백엔드에 구독 정보 전송
        const form: PushRequest = {
          endpoint: subscription.endpoint,
          p256dh: arrayBufferToBase64(subscription.getKey("p256dh")),
          auth: arrayBufferToBase64(subscription.getKey("auth")),
          deviceInfo: navigator.userAgent,
        };

        await dispatch(subscribe(form)).unwrap();

        console.log("endpoint:", subscription.endpoint);
        console.log(
          "p256dh (Base64):",
          arrayBufferToBase64(subscription.getKey("p256dh"))
        );
        console.log(
          "auth (Base64):",
          arrayBufferToBase64(subscription.getKey("auth"))
        );

        alert("푸시 알림이 활성화되었습니다");
      }
    } catch (error) {
      console.error("푸시 알림 처리 실패:", error);
      alert("푸시 알림 처리 중 오류가 발생했습니다");
    } finally {
      setIsProcessing(false);
      // 상태 다시 확인
      dispatch(fetchWebPushStatus());
    }
  };

  const readNoti = (notificationId: number) => {
    dispatch(readNotification(notificationId));
  };

  const deleteNoti = (notificationId: number) => {
    dispatch(deleteNotification(notificationId));
  };

  useEffect(() => {
    const hasUnread = notificationSelector?.some((n) => !n.isRead) ?? false;
    hasUnreadNoti(hasUnread);
    console.log("notificationSle: ", notificationSelector);
    console.log("pushState: ", pushSelector);
  }, [notificationSelector, pushSelector]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50" onClick={onClose}>
        <div
          className="absolute right-10 top-2 mt-2 w-96 h-auto pl-1 pr-1 bg-white shadow-[0_0_5px_rgba(34,34,34,0.3)] rounded-xl text-main-text"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-auto max-h-[450px]">
            <div className="flex flex-row font-bold text-lg m-5 items-center justify-center text-center">
              <p
                className="text-center cursor-pointer"
                onClick={createTestNoti}
              >
                알림
              </p>
              <div className="absolute right-5">
                <button
                  className="button-smallButton"
                  onClick={togglePushSubscription}
                >
                  {pushSelector?.valueOf() ? (
                    <p className="text-[8px]">푸시 알림 차단</p>
                  ) : (
                    <p className="text-[8px]">푸시 알림 구독</p>
                  )}
                </button>
              </div>
            </div>
            <div className="h-[calc(450px-73px)] overflow-y-auto scrollbar">
              {notificationSelector && notificationSelector.length > 0 ? (
                notificationSelector.map((notification) => (
                  <NotificationItem
                    key={notification.notificationId}
                    isRead={notification.isRead}
                    notificationType={notification.notificationType}
                    createdTime={notification.createdTime}
                    noticeText={notification.noticeText}
                    readNotification={() =>
                      readNoti(notification.notificationId)
                    }
                    deleteNotification={() =>
                      deleteNoti(notification.notificationId)
                    }
                  />
                ))
              ) : (
                <div>
                  <p className="text-center text-base">알림이 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function arrayBufferToBase64(buffer: ArrayBuffer | null): string {
  if (!buffer) return "";
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export default NotificationModal;
