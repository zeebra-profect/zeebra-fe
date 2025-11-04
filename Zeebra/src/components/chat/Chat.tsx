import { useEffect, useState } from "react";
import PrivateChatModal from "./PrivateChatModal";
import type { AllDmRoom } from "@/utils/chat";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface ChatProps {
  children : AllDmRoom;
}

function Chat({children} : ChatProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    // const dispatch = useAppDispatch();
    // const chat = useAppSelector(state => state.chat.dmRoom);

    useEffect(() => {
      // dispatch(fetch)
    },[])

  return (
    <>
      <div className="w-full flex justify-center">
        <hr className="text-grey w-11/12" />
      </div>
      <div className="flex flex-row justify-between mt-2.5 mb-2.5 ml-5 mr-5 cursor-pointer items-center" onClick={() => setIsOpen(true)}>
        <div className="flex flex-row gap-y-2.5 gap-x-2.5">
          <img src="" className="w-12 h-12 rounded-full" />
          <div className="flex flex-col text-left justify-center">
            <p className="font-normal text-grey2 text-xs">{children.roomName}</p>
            {/* <p className="font-medium text-xs">
              Nike Air Force 1 ‘07 Low White
            </p> */}
            <p className="font-light text-sm">{children.lastMessageContent? children.lastMessageContent : `메시지를 보내보세요!`}</p>
          </div>
        </div>
        <div className="cursor-pointer flex flex-col gap-y-0.5 p-2 items-center">
          <div className="min-w-6 h-auto bg-orange rounded-xl p-0.5 text-center">
            <p className="text-white font-bold">{children.unreadCount}</p>
          </div>
          <p>{children.lastMessageTime}</p>
        </div>
      </div>
      {/* <PrivateChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} children={children}/> */}
      <PrivateChatModal isOpen={isOpen} onClose={() => setIsOpen(false)}/>
    </>
  );
}

export default Chat;
