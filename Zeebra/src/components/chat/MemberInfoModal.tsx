// import { useAppDispatch } from "@/store/hooks";
import { fetchDMChatRoom } from "@/store/chatSlice";
import type { MessageProps } from "./Message";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { type DMChatRoomReq } from '../../utils/chat';
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: MessageProps;
}

export function MemberInfoModal({ isOpen, onClose, children }: ModalProps) {
  const dispatch = useAppDispatch();
  const dmRoom = useAppSelector(state => state.chat.dmRoom);
  console.log("children?: ", children);

  const onClickCreateDMRoom = () => {

    const form : DMChatRoomReq = {
      memberId: Number(children.memberId),
      chatRoomType: "DM",
    };

    dispatch(fetchDMChatRoom(form));
  };

  useEffect(() => {
    console.log("dmRoom???: ", dmRoom);
  }, [dmRoom]);

  if (!isOpen) return null;

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
            src={children.message.profileImageUrl || undefined}
            className="w-20 h-20 rounded-3xl cursor-pointer"
          />
          <p className="font-semibold text-base">
            {children.message.senderName}
          </p>
          <p className="font-normal text-xs">{children.message.content}</p>
          <button className="button-cancelButton" onClick={onClickCreateDMRoom}>1:1 채팅하기</button>
        </div>
      </div>
    </>
  );
}
