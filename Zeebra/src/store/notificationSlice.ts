import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getNotifications as getNotificationsAPI, type NotiRes } from "../utils/notification"; // API 함수 import
import { addNotification as addNotificationsAPI } from "../utils/notification"; // API 함수 import

const initialState: NotiRes[] = [];

export const fetchNotifications = createAsyncThunk<NotiRes[]>(
  'notification/fetch',
  async () => {
    const response = await getNotificationsAPI();
    return response.data.dtos;
  }
);

export const postNotification = createAsyncThunk<void>(
  'notification/post',
  async () => { await addNotificationsAPI();}
)

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    getNotification: (state, action: PayloadAction<NotiRes>) => {
      state.unshift(action.payload); // 새 알림 앞에 추가
    },
    getNotifications: (state, action: PayloadAction<NotiRes[]>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      return action.payload; // API 응답으로 상태 업데이트
    });
  },
});

export const { getNotification, getNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
