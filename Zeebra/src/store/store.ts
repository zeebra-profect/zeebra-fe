import { configureStore } from "@reduxjs/toolkit";
import reducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
