// import { useAppDispatch } from "@/store/hooks";
import type { MessageProps } from "./Message";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: MessageProps;
}

export function MemberInfoModal({ isOpen, onClose, children }: ModalProps) {
    
    // const dispatch = useAppDispatch();


    if (!isOpen) return null;

    // const onClickCreateDMRoom = () => {
    
    // }
  
    return (
    <>
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-pretendard"
        onClick={onClose}
      >
        <div
          className="flex flex-col bg-white rounded-2xl p-5 max-w-md w-full mx-4 h-auto gap-y-2.5 items-center"
          onClick={(e) => e.stopPropagation()}
        >
        <img
            src={children.photo}
            className="w-20 h-20 rounded-3xl cursor-pointer"
          />
        <p className="font-semibold text-base">
            {children.nickName}
        </p>
        <p className="font-normal text-xs">
            {children.content}
        </p>
        <button className="button-cancelButton">1:1 채팅하기</button>
        </div>
      </div>
    </>
  );
}
