import Notification from "./Notification";
import { useEffect } from "react";
import { createNotification } from "../../store/notificationSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type {
  NotificationRequest,
  NotificationResponses,
} from "@/utils/notification";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications?: NotificationResponses["data"];
}

function NotificationModal({ isOpen, onClose, notifications }: ModalProps) {
  const dispatch = useAppDispatch();
  const selector = useAppSelector(
    (state) => state.notification.notification?.data
  );
  const selector2 = useAppSelector(state => state.auth.me)
  // const me = useAuth();
  const createTestNoti = () => {
    const form: NotificationRequest = {
      memberId: Number(selector2?.memberId),
      notificationType: "TEST",
      object: null,
    };

    dispatch(createNotification(form));
    console.log("보내지니?: ", form);
  };

  useEffect(() => {}, [selector]);

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
                <div>
                  <p className="text-center text-base">
                  알림이 없습니다.
                  </p>
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
