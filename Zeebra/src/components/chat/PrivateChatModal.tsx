import Message from "./Message";
import chatIcon from "../../img/icons/chat.png";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function PrivateChatModal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50" onClick={onClose}>
        <div
          className="absolute right-50 top-4 flex flex-col w-96 h-auto pr-1 pl-1 bg-white shadow-[0_0_5px_rgba(34,34,34,0.3)] rounded-xl text-main-text gap-4 items-center pb-5"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="font-bold text-base text-center mt-4">asdf1234</p>
          <div className="flex flex-row justify-center items-center gap-x-3">
            <img src="" className="h-15 w-15 rounded-lg" />
            <div className="flex flex-col text-left">
              <p className="font-normal text-base">
                Nike Air Force 1 ‘07 Low White
              </p>
              <p className="font-light text-xs/4 text-grey2">
                나이키 에어포스 1 ‘07 로우 화이트
              </p>
              <p className="font-light text-xs text-grey2">
                315122-111/CW2288-111
              </p>
            </div>
          </div>
          <div className="fixed top-104 flex flex-row justify-between w-[350px] h-6 bg-white rounded-[5px] p-1">
            <input
              type="text"
              placeholder="sasdasd"
              className="sticky w-[320px] outline-none"
            />
            <button className="">
              <img
                src={chatIcon}
                className="w-[15px] h-[15px] cursor-pointer"
              />
            </button>
          </div>
          <div className="min-h-28 max-h-[300px] overflow-y-auto scrollbar w-29/30 bg-gray-100 rounded-lg p-1 pb-10">
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivateChatModal;
