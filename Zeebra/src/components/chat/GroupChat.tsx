import { fetchChatMessages, fetchChatRoom } from "@/store/chatSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useMemo, useRef, useState } from "react";
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
        chatRoomType: "GROUP"
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

const hasSubscribed = useRef(false); // ⭐ 추가

useEffect(() => {
  if (!roomInfo?.chatRoomId) return;
  if (hasSubscribed.current) return; // ⭐ 이미 구독했으면 스킵
  
  hasSubscribed.current = true; // ⭐ 구독 완료 표시

  if (myMemberId) {
    chatWebSocket.connect();
  }

  const subscribeWhenReady = () => {
    if (chatWebSocket.isConnected()) {
      chatWebSocket.subscribe(roomInfo.chatRoomId!, (newMessage) => {
        console.log("📨 새 메시지 받음:", newMessage);
        setRealtimeMessages((prev) => {
          console.log("🔵 이전:", prev);
          const updated = [...prev, newMessage];
          console.log("🟢 업데이트:", updated);
          return updated;
        });
      });
    } else {
      setTimeout(subscribeWhenReady, 100); // 연결될 때까지 재시도
    }
  };

  subscribeWhenReady();

  return () => {
    hasSubscribed.current = false;
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

const allMessages = useMemo(() => {
  console.log("🔄 allMessages 재계산");
  console.log("chatHistory:", chatHistory?.content);
  console.log("realtimeMessages:", realtimeMessages);
  return [...(chatHistory?.content || []), ...realtimeMessages];
}, [chatHistory?.content, realtimeMessages]);

useEffect(() => {
  console.log("allMe: ", allMessages);
}, [allMessages]);

  // 5. 기존 메시지 + 실시간 메시지 합치기

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
            time={chat.createdAt}
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