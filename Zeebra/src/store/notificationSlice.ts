import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getNotifications as getNotificationsAPI,
  type NotificationRequest,
  type NotificationApiResponse,
  type NotificationResponse,
  putNotification as putNotificationAPI,
  deleteNotification as deleteNotificationAPI,
} from "../utils/notification";
import { postNotification as postNotificationAPI } from "../utils/notification";
import type { ApiResponse } from "@/utils/cart";

interface NotificationState {
  notification: NotificationApiResponse | null;
}

const initialState: NotificationState = {
  notification: null,
};

// 유저가 가지고 있는 모든 알림 가져오기
export const fetchNotifications = createAsyncThunk<NotificationApiResponse>(
  "notification/getAll",
  async () => {
    const response = await getNotificationsAPI();
    console.log("response : ", response);
    return response;
  }
);

// 테스트용 알림 생성하기
export const createNotification = createAsyncThunk<
  NotificationResponse,
  NotificationRequest
>("notification/post", async (form: NotificationRequest) => {
  const response = await postNotificationAPI(form);
  return response.data;
});

// 알림 읽기
export const readNotification = createAsyncThunk<ApiResponse, number>(
  "notification/read",
  async (notificationId: number) => {
    const response = await putNotificationAPI(notificationId);
    return response;
  }
);

// 알림 삭제
export const deleteNotification = createAsyncThunk<
  NotificationApiResponse,
  number
>("notification/delete", async (notificationId: number) => {
  const response = await deleteNotificationAPI(notificationId);
  console.log("deleted? ", response);
  return response;
});

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    getNotifications: (
      state,
      action: PayloadAction<NotificationApiResponse>
    ) => {
      state.notification = action.payload;
    },
    // postNotification: (state, action: PayloadAction<NotificationResponse>) => {
    //   state.notification?.data.dtos.unshift(action.payload);
    // },
    // putNotification: (state, action: PayloadAction<ApiResponse>) => {
    //   if (!state.notification) return;

    //   const { status, message } = action.payload;

    //   if (status === "success" && message) {
    //     const notificationId = Number(message);

    //     const notification = state.notification.data.dtos.find(
    //       (n) => n.notificationId === notificationId
    //     );

    //     if (notification) {
    //       notification.isRead = true;
    //     }
    //   } else if (status === "error") {
    //     console.error("❌ 에러:", message);
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchNotifications.pending, (state) => {
      //   state.notification = null;
      // })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notification = action.payload;
      })
      // .addCase(fetchNotifications.rejected, (state) => {
      //   state.notification = null;
      // })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.notification?.data.dtos.unshift(action.payload);
      })
      .addCase(readNotification.fulfilled, (state, action) => {
        if (!state.notification) return;

        const { status, message } = action.payload;

        if (status === "success" && message) {
          const notificationId = Number(message);

          const notification = state.notification.data.dtos.find(
            (n) => n.notificationId === notificationId
          );

          if (notification) {
            notification.isRead = true;
          }

          state.notification.data.dtos = state.notification.data.dtos.map(
            (noti) =>
              noti.notificationId === notificationId
                ? { ...noti, isRead: true } // 새 객체
                : noti
          );
        } else if (status === "error") {
          console.error("❌ 에러:", message);
        }
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        console.log("삭제 후 받은 데이터:", action.payload);
        state.notification = action.payload;
      });
  },
});

export const { getNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
