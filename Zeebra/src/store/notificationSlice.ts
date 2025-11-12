import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getNotifications as getNotificationsAPI,
  type NotificationRequest,
  type NotificationResponses,
} from "../utils/notification"; // API 함수 import
import { postNotification as postNotificationAPI } from "../utils/notification"; // API 함수 import

interface NotificationState {
  notification: NotificationResponses | null;
}

const initialState: NotificationState = {
  notification: null,
};

// 유저가 가지고 있는 모든 알림 가져오기
export const fetchNotifications = createAsyncThunk<NotificationResponses>(
  "notification/getAll",
  async () => {
    const response = await getNotificationsAPI();
    return response;
  }
);

// 테스트용 알림 생성하기
export const createNotification = createAsyncThunk<
  NotificationResponses,
  NotificationRequest
>("notification/post", async (form: NotificationRequest) => {
  const response = await postNotificationAPI(form);
  return response;
});

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    getNotifications: (state, action: PayloadAction<NotificationResponses>) => {
      state.notification = action.payload;
    },
    postNotification: (state, action: PayloadAction<NotificationResponses>) => {
      state.notification = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.notification = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notification = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.notification = null;
      })
      .addCase(createNotification.pending, (state) => {
        state.notification = null;
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.notification = action.payload;
      })
      .addCase(createNotification.rejected, (state) => {
        state.notification = null;
      });
  },
});

export const { postNotification, getNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
