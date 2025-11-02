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

export const fetchChatMessages = createAsyncThunk<PageData, ChatMessagesReq>(
    'chat/fetchChatHistory',
    async ({roomId, req}) => {
        const response = await getChatHistoryAPI(roomId, req);
        return response.data;
    }
)

export const fetchChatRoom = createAsyncThunk<ChatRoomResponse, ChatRoomReq>(
    'chat/fetchChatRoom',
    async (req) => {
        const response = await getOrCreateChatRoomAPI(req);
        return response.data;
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