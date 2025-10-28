// import Message from "./Message";
import chatIcon from "../../img/icons/chat.png";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function PrivateChatModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50" onClick={onClose}>
        <div
          className="absolute right-50 top-4 flex flex-col w-96 h-[500px] bg-white shadow-[0_0_5px_rgba(34,34,34,0.3)] rounded-xl text-main-text overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            <p className="font-bold text-base text-center">asdf1234</p>
          </div>
          <div className="flex flex-row items-center gap-x-3 p-4">
            <img src="" className="h-15 w-15 rounded-lg bg-gray-200" />
            <div className="flex flex-col text-left">
              <p className="font-normal text-base">
                Nike Air Force 1 '07 Low White
              </p>
              <p className="font-light text-xs text-grey2">
                나이키 에어포스 1 '07 로우 화이트
              </p>
              <p className="font-light text-xs text-grey2">
                315122-111/CW2288-111
              </p>
            </div>
          </div>

          {/* 채팅 메시지 영역 */}
          <div className="flex-1 overflow-y-auto scrollbar bg-gray-100 p-3">
            {/* <Message myMemberId={1} memberId={2} /> */}
            {/* <Message myMemberId={2} memberId={2} /> */}
            {/* <Message myMemberId={1} memberId={2} /> */}
            {/* <Message myMemberId={2} memberId={2} /> */}
            {/* <Message myMemberId={2} memberId={2} /> */}
            {/* <Message myMemberId={2} memberId={2} /> */}
          </div>

          {/* 입력창 */}
          <div className="p-3 bg-white">
            <div className="flex flex-row items-center gap-x-2 bg-gray-100 rounded-lg px-3 py-2">
              <input
                type="text"
                placeholder="메시지를 입력하세요"
                className="flex-1 bg-transparent outline-none"
              />
              <button>
                <img
                  src={chatIcon}
                  className="w-5 h-5 cursor-pointer"
                  alt="send"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivateChatModal;
