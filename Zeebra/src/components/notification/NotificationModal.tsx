import Notification from "./Notification";
import { useEffect } from "react";
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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasUnreadNoti: (value: boolean) => void;
}

function NotificationModal({ isOpen, onClose, hasUnreadNoti }: ModalProps) {
  const dispatch = useAppDispatch();
  const notificationSelector = useAppSelector(
    state => state.notification.notification?.data?.dtos
  );

  useEffect(() => {
    dispatch(fetchNotifications());
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
  }, [notificationSelector]);

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
              {notificationSelector && notificationSelector.length > 0 ? (
                notificationSelector.map((notification) => (
                  <Notification
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

export default NotificationModal;
