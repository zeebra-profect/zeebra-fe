import {
  getChatHistory as getChatHistoryAPI,
  getOrCreateChatRoom as getOrCreateChatRoomAPI,
  type ChatHistoryReq,
  type PageData,
  type ChatRoomResponse,
  type ChatRoomReq,
  type DMChatRoomReq,
  getOrCreateDMChatRoom as getOrCreateDMChatRoomAPI,
  type DMChatRoomResponse,
  type DMChatRoomsResponse,
  getAllDMChatRoom as getAllDMChatRoomAPI,
} from "@/utils/chat";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface ChatState {
  room: ChatRoomResponse | null;
  dmRoom: DMChatRoomResponse | null;
  rooms: DMChatRoomsResponse | null;
  messages: PageData | null;
}

interface ChatMessagesReq {
  roomId: number;
  req?: ChatHistoryReq;
}

const initialState: ChatState = {
  room: null,
  dmRoom: null,
  rooms: null,
  messages: null,
};

export const fetchChatMessages = createAsyncThunk<PageData, ChatMessagesReq>(
  "chat/fetchChatHistory",
  async ({ roomId, req }) => {
    const response = await getChatHistoryAPI(roomId, req);
    return response.data;
  }
);

export const fetchChatRoom = createAsyncThunk<ChatRoomResponse, ChatRoomReq>(
  "chat/fetchChatRoom",
  async (req) => {
    const response = await getOrCreateChatRoomAPI(req);
    return response.data;
  }
);

export const fetchDMChatRoom = createAsyncThunk<DMChatRoomResponse, DMChatRoomReq>(
  "chat/fetchDMChatRoom",
  async (req) => {
    const response = await getOrCreateDMChatRoomAPI(req);
    return response;
  }
);

export const fetchAllDMChatRoom = createAsyncThunk<DMChatRoomsResponse>(
  "chat/fetchAllDMRooms",
  async () => {
    const response = await getAllDMChatRoomAPI();
    return response;
  }
 );

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatHistory: (state, action: PayloadAction<PageData>) => {
      // ← 수정
      state.messages = action.payload;
    },
    setChatRoom: (state, action: PayloadAction<ChatRoomResponse>) => {
      state.room = action.payload;
    },
    setDMChatRoom: (state, action: PayloadAction<DMChatRoomResponse>) => {
      state.dmRoom = action.payload;
    },
    getDMChatRooms: (state, action: PayloadAction<DMChatRoomsResponse>) => {
      state.rooms = action.payload;
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
      })
      .addCase(fetchDMChatRoom.pending, (state) => {
        state.dmRoom = null;
      })
      .addCase(fetchDMChatRoom.fulfilled, (state, action) => {
        state.dmRoom = action.payload;
      })
      .addCase(fetchDMChatRoom.rejected, (state) => {
        state.dmRoom = null;
      })
      .addCase(fetchAllDMChatRoom.pending, (state) => {
        state.rooms = null;
      })
      .addCase(fetchAllDMChatRoom.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })
      .addCase(fetchAllDMChatRoom.rejected, (state) => {
        state.rooms = null;
      });

  },
});

export const { setChatHistory, setChatRoom } = chatSlice.actions;

export default chatSlice.reducer;
