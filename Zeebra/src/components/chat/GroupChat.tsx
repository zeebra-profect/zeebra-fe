import { fetchChatMessages, fetchChatRoom } from "@/store/chatSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import chatIcon from "../../img/icons/chat.png";
import Message from "./Message";
import { refetchMe } from "@/store/authSlice";
import type { ChatMessage } from "@/utils/chat";
import { chatWebSocket } from "@/lib/ChatSocket";

function GroupChat({ productId }: { productId: number | undefined }) {
  const dispatch = useAppDispatch();
  const roomInfo = useAppSelector((state) => state.chat.room);
  const chatHistory = useAppSelector((state) => state.chat.messages);
  const myMemberId = useAppSelector((state) => state.auth.me);
  const [inputMessage, setInputMessage] = useState("");
  const [realtimeMessages, setRealtimeMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    dispatch(
      fetchChatRoom({
        productId: Number(productId),
        saleId: null,
      })
    );
    dispatch(refetchMe());
  }, [productId, dispatch]);

  useEffect(() => {
    if (roomInfo?.chatRoomId) {
      dispatch(
        fetchChatMessages({
          roomId: roomInfo.chatRoomId,
          req: { page: 0, size: 30, sort: "createdAt,desc" },
        })
      );
    }
  }, [roomInfo, dispatch]);

  // 소켓 관련
  useEffect(() => {
    if (!roomInfo?.chatRoomId) return;

    // 로그인했으면 연결
    if (myMemberId) {
      chatWebSocket.connect();
    }

    // 구독 (실시간 메시지 받기)
    setTimeout(() => {
      chatWebSocket.subscribe(roomInfo.chatRoomId, (newMessage) => {
        setRealtimeMessages((prev) => [...prev, newMessage]);
      });
    }, 500);

    return () => {
      chatWebSocket.disconnect();
    };
  }, [roomInfo?.chatRoomId, myMemberId]);

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    if (!myMemberId) {
      alert("로그인이 필요합니다");
      return;
    }
    if (!roomInfo?.chatRoomId) return;

    chatWebSocket.sendMessage(roomInfo.chatRoomId, inputMessage, "TEXT");
    console.log("메시지 전송:", inputMessage); // ← 이거 나와?

    setInputMessage("");
  };

  // 5. 기존 메시지 + 실시간 메시지 합치기
  const allMessages = [...(chatHistory?.content || []), ...realtimeMessages];

  return (
    <div className="w-full lg:max-w-[520px] h-[400px] md:h-[500px] lg:h-[600px] rounded-[20px] bg-gray-100 flex flex-col">
      <div className="flex-1 overflow-y-auto scrollbar p-3">
        {allMessages.map((chat) => (
          <Message
            key={chat.messageId}
            productId={Number(productId)}
            memberId={chat.senderMemberId}
            myMemberId={Number(myMemberId?.memberId)}
            content={chat.content}
            time={chat.createTime}
            nickName={String(myMemberId?.nickname)}
            photo={String(myMemberId?.memberImage)}
          />
        ))}
      </div>

      {/* 입력창 - 하단 고정 */}
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
    </div>
  );
}

export default GroupChat;
