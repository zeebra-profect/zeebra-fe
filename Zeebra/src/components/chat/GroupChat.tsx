import { fetchChatMessages, fetchChatRoom } from "@/store/chatSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

function GroupChat({ productId }: { productId: number | undefined }) {
  const dispatch = useAppDispatch();
  const roomInfo = useAppSelector((state) => state.chat.room);
  const chatHistory = useAppSelector((state) => state.chat.messages);

//   const historyReq = {
//     page: 30,
//     size: 10,
//     sort: "createdAt,desc",
//   };

  useEffect(() => {
    dispatch(
      fetchChatRoom({
        productId: Number(productId),
        saleId: null,
      })
    );
  }, [productId]);

  useEffect(() => {
    dispatch(
      fetchChatMessages({
        roomId: 1,
        req: { page: 0, size: 30, sort: "createdAt,desc" },
      })
    );
  }, [roomInfo]);

  useEffect(() => {
    console.log("chatHistory: ", chatHistory);
  }, [chatHistory]);

  return (
    <div className="w-full lg:max-w-[520px] h-[400px] md:h-[500px] lg:h-[600px] rounded-[20px] bg-gray-100"></div>
  );
}

export default GroupChat;
