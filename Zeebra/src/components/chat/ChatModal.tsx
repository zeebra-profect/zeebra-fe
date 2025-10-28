import Chat from "./Chat";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function ChatModal({ isOpen, onClose, _children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50" onClick={onClose}>
        <div
          className="absolute right-50 top-2 mt-2 w-96 h-auto pr-1 pl-1 bg-white shadow-[0_0_5px_rgba(34,34,34,0.3)] rounded-xl text-main-text"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col max-h-[450px] overflow-auto scrollbar">
            <div className="p-5 border-b-grey">
              <p className="font-bold text-lg text-center">내 채팅방 목록</p>
            </div>
            <div className="h-[calc(450px-73px)] overflow-y-auto scrollbar">
              <Chat />
              <Chat />
              <Chat />
              <Chat />
              <Chat />
              <Chat />
              <Chat />
              <Chat />
              <Chat />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatModal;
