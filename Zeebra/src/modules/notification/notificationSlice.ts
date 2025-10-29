import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getNotifications as getNotificationsAPI } from "../../utils/notification";  // API 함수 import


interface Notification {
  notificationType: string;
  isRead: boolean;
}

const initialState: Notification[] = [];

export const fetchNotifications = createAsyncThunk(
  'notification/fetch',
  async () => {
    const response = await getNotificationsAPI();
    return response.data.dtos;  // NotificationsResponse에서 dtos 배열 반환
  }
);

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notification>) => {
            state.unshift(action.payload);  // 새 알림 앞에 추가
        },
        setNotifications: (state, action: PayloadAction<Notification[]>) => {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            return action.payload;  // API 호출 성공 시 state 업데이트
        });
    },
});

export const {
    addNotification,
    setNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;