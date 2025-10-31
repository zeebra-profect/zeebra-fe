import { combineReducers } from "@reduxjs/toolkit";
import notificationSlice from "./notificationSlice";
import authSlice from "./authSlice";

const rootReducer = combineReducers(
    {
        
        notification: notificationSlice,
        auth: authSlice,
    }
)

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;