import Notification from "./Notification";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function NotificationModal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50" onClick={onClose}>
        <div
          className="absolute right-10 top-2 mt-2 w-96 h-auto pl-1 pr-1 bg-white shadow-[0_0_5px_rgba(34,34,34,0.3)] rounded-xl text-main-text"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-auto max-h-[450px] overflow-auto scrollbar">
            <div className="flex flex-col font-bold text-lg m-5 items-center justify-center text-center">
              <p className="text-center">알림</p>
            </div>
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
          </div>
        </div>
      </div>
    </>
  );
}

export default NotificationModal;
