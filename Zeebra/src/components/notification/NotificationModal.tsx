import Notification from "./Notification";
import { useEffect } from "react";
import { fetchNotifications } from "../../modules/notification/notificationSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

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
  }, []);

  useEffect(() => {
    console.log("selector: ", notifications);
  },[notifications])

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
              <p className="text-center">알림</p>
            </div>
            <div className="h-[calc(450px-73px)] overflow-y-auto scrollbar">
              {
                notifications?.map((noti, index) => (

                  <Notification key={index} isRead={noti.isRead} type={noti.notificationType} createdTime={noti.createdTime} text={noti.noticeText} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotificationModal;
