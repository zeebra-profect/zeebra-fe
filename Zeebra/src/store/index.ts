import { combineReducers } from "@reduxjs/toolkit";
import notificationSlice from "./notificationSlice";
import authSlice from "./authSlice";
import productSlice from './productSlice';

const rootReducer = combineReducers(
    {
        notification: notificationSlice,
        auth: authSlice,
        product: productSlice,
    }
)

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;