import { combineReducers } from "@reduxjs/toolkit";
import notificationSlice from "./notificationSlice";
import authSlice from "./authSlice";
import productSlice from './productSlice';
import cartSlice from './cartSlice';
import orderSlice from './orderSlice';

const rootReducer = combineReducers(
    {
        notification: notificationSlice,
        auth: authSlice,
        product: productSlice,
        cart: cartSlice,
        order: orderSlice,
    }
)

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;