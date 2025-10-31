import Notification from "./Notification";
import { useEffect } from "react";
import {
  fetchNotifications,
  getNotification,
  postNotification,
} from "../../store/notificationSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import notificationSocket from "@/lib/NotificationSocket";
import type { NotiRes } from "@/utils/notification";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // children?: React.ReactNode;
}

function NotificationModal({ isOpen, onClose }: ModalProps) {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.notification);

  useEffect(() => {
    dispatch(fetchNotifications());
    // notificationSocket.connect();

    // notificationSocket.socket!.onmessage = (event: MessageEvent) => {
    //   const newNotification: NotiRes = JSON.parse(event.data);
    //   console.log("📨 받은 데이터: ", newNotification);
    //   console.log("createdTime:", newNotification.createdTime); // 👈 이거 확인
    //   dispatch(getNotification(newNotification));
    // };

    // return () => {
    //   notificationSocket.disconnect();
    // };
  }, []);

  const createTestNoti = () => {
    dispatch(postNotification());
  };
  // useEffect(() => {
  //   console.log("selector: ", notifications);
  // },[notifications])

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50" onClick={onClose}>
        <div
          className="absolute right-10 top-2 mt-2 w-96 h-auto pl-1 pr-1 bg-white shadow-[0_0_5px_rgba(34,34,34,0.3)] rounded-xl text-main-text"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-auto max-h-[450px]">
            <div className="flex flex-col font-bold text-lg m-5 items-center justify-center text-center">
              <p
                className="text-center cursor-pointer"
                onClick={createTestNoti}
              >
                알림
              </p>
            </div>
            <div className="h-[calc(450px-73px)] overflow-y-auto scrollbar">
              {notifications && notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <Notification
                    key={index}
                    isRead={notification.isRead}
                    notificationType={notification.notificationType}
                    createdTime={notification.createdTime}
                    noticeText={notification.noticeText}
                  />
                ))
              ) : (
                <div>알림이 없습니다</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotificationModal;
