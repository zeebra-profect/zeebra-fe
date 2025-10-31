import { getChatHistory as getChatHistoryAPI, getOrCreateChatRoom as getOrCreateChatRoomAPI, type ChatHistoryReq, type PageData, type ChatRoomResponse, type ChatRoomReq } from "@/utils/chat";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
    room: ChatRoomResponse | null;
    messages: PageData | null;  // ← ChatHistoryResponse가 아니라 PageData
}

interface ChatMessagesReq {
    roomId: number;
    req?: ChatHistoryReq;  // ← optional로 변경
}

const initialState: ChatState = {
  room: null,
  messages: null,
};

// ✅ 반환 타입을 PageData로 변경
export const fetchChatMessages = createAsyncThunk<PageData, ChatMessagesReq>(
    'chat/fetchChatHistory',
    async ({roomId, req}) => {
        const response = await getChatHistoryAPI(roomId, req);
        return response.data;  // ← PageData 반환
    }
)

// ✅ 이것도 동일하게 수정
export const fetchChatRoom = createAsyncThunk<ChatRoomResponse, ChatRoomReq>(
    'chat/fetchChatRoom',
    async (req) => {
        const response = await getOrCreateChatRoomAPI(req);
        return response.data;  // ← ChatRoomResponse 반환
    }
)

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChatHistory: (state, action: PayloadAction<PageData>) => {  // ← 수정
            state.messages = action.payload;
        },
        setChatRoom: (state, action: PayloadAction<ChatRoomResponse>) => {
            state.room = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchChatMessages.pending, (state) => {
            state.messages = null;
          })
          .addCase(fetchChatMessages.fulfilled, (state, action) => {
            state.messages = action.payload;
          })
          .addCase(fetchChatMessages.rejected, (state) => {
            state.messages = null;
          })
          .addCase(fetchChatRoom.pending, (state) => {
            state.room = null;
          })
          .addCase(fetchChatRoom.fulfilled, (state, action) => {
            state.room = action.payload;
          })
          .addCase(fetchChatRoom.rejected, (state) => {
            state.room = null;
          });
    },
});

export const { setChatHistory, setChatRoom } = chatSlice.actions;

export default chatSlice.reducer;