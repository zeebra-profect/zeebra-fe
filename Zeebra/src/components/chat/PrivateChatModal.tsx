// import Message from "./Message";
import { useEffect, useState } from "react";
import chatIcon from "../../img/icons/chat.png";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { AllDmRoom, ChatMessage } from "@/utils/chat";
import { fetchChatRoom, fetchDMChatRoom } from "@/store/chatSlice";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: AllDmRoom;
}

function PrivateChatModal({ isOpen, onClose, children }: ModalProps) {
    const dispatch = useAppDispatch();
    const roomInfo = useAppSelector((state) => state.chat.dmRoom);
    const chatHistory = useAppSelector((state) => state.chat.messages);
    const myMemberId = useAppSelector((state) => state.auth.me);
    const [inputMessage, setInputMessage] = useState("");
    const [realtimeMessages, setRealtimeMessages] = useState<ChatMessage[]>([]);
  
    // useEffect(() => {
    //   dispatch(
    //     fetchDMChatRoom({
    //       memberId: children.memberId;
    //       chatRoomType: "DM";
    //     })
    //   );
    //   dispatch(refetchMe());
    // }, [productId, dispatch]);
  
    // useEffect(() => {
  
    //   console.log("roomInfo:" , roomInfo);
    //   if (roomInfo?.chatRoomId) {
    //     dispatch(
    //       fetchChatMessages({
    //         roomId: roomInfo.chatRoomId,
    //         req: { page: 0, size: 30, sort: "createdAt,desc" },
    //       })
    //     );
    //   }
    // }, [roomInfo, dispatch]);
  
    // 소켓 관련
    // useEffect(() => {
    //   if (!roomInfo?.chatRoomId) return;
  
    //   // 로그인했으면 연결
    //   if (myMemberId) {
    //     chatWebSocket.connect();
    //   }
  
    //   // 구독 (실시간 메시지 받기)
    //   setTimeout(() => {
    //     chatWebSocket.subscribe(roomInfo.chatRoomId, (newMessage) => {
    //       setRealtimeMessages((prev) => [...prev, newMessage]);
    //     });
    //   }, 500);
  
    //   return () => {
    //     chatWebSocket.disconnect();
    //   };
    // }, [roomInfo?.chatRoomId, myMemberId]);
  
    // const handleSend = () => {
    //   if (!inputMessage.trim()) return;
    //   if (!myMemberId) {
    //     alert("로그인이 필요합니다");
    //     return;
    //   }
    //   if (!roomInfo?.chatRoomId) return;
  
    //   chatWebSocket.sendMessage(roomInfo.chatRoomId, inputMessage, "TEXT");
    //   console.log("메시지 전송:", inputMessage); // ← 이거 나와?
  
    //   setInputMessage("");
    // };
  
    // // 5. 기존 메시지 + 실시간 메시지 합치기
    // const allMessages = [...(chatHistory?.content || []), ...realtimeMessages];
  
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
          </div>

          {/* 입력창 */}
                <div className="p-3 bg-transparent border-t border-gray-200">
        <div className="flex flex-row items-center gap-x-2 bg-white rounded-lg px-3 py-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="메시지를 입력하세요"
            className="flex-1 bg-transparent outline-none"
          />
          <button onClick={handleSend}>
            <img src={chatIcon} className="w-5 h-5 cursor-pointer" alt="send" />
          </button>
        </div>
      </div>

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
