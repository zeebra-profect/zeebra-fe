import { fetchChatMessages, fetchChatRoom } from "@/store/chatSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import chatIcon from "../../img/icons/chat.png";
import Message from "./Message";
import { refetchMe } from "@/store/authSlice";

function GroupChat({ productId }: { productId: number | undefined }) {
  const dispatch = useAppDispatch();
  const roomInfo = useAppSelector((state) => state.chat.room);
  const chatHistory = useAppSelector((state) => state.chat.messages);
  const myMemberId = useAppSelector((state) => state.auth.me);

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

  useEffect(() => {
    console.log("id? : ", myMemberId);
  }, [myMemberId]);

  useEffect(() => {
    console.log("chatHistory: ", chatHistory);
  }, [chatHistory]);

  return (
    <div className="w-full lg:max-w-[520px] h-[400px] md:h-[500px] lg:h-[600px] rounded-[20px] bg-gray-100 flex flex-col">
      {/* 채팅 메시지 영역 - flex-1로 남은 공간 차지 */}
      <div className="flex-1 overflow-y-auto scrollbar p-3">
        {chatHistory?.content.map((chat) => (
          <Message
            key={chat.messageId}
            memberId={chat.senderMemberId}
            myMemberId={Number(myMemberId?.memberId)}
            content={chat.content}
            time={chat.createTime}
            nickName={String(myMemberId?.nickname)}
          />
        ))}
      </div>

      {/* 입력창 - 하단 고정 */}
      <div className="p-3 bg-transparent border-t border-gray-200">
        <div className="flex flex-row items-center gap-x-2 bg-white rounded-lg px-3 py-2">
          <input
            type="text"
            placeholder="메시지를 입력하세요"
            className="flex-1 bg-transparent outline-none"
          />
          <button>
            <img src={chatIcon} className="w-5 h-5 cursor-pointer" alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default GroupChat;