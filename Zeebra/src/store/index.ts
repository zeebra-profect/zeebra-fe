import { combineReducers } from "@reduxjs/toolkit";
import notificationSlice from "./notificationSlice";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";
import favoritesSlice from "./favoriteSlice";
import chatSlice from "./chatSlice";
import paymentSlice from './paymentSlice';

const rootReducer = combineReducers({
  notification: notificationSlice,
  auth: authSlice,
  product: productSlice,
  cart: cartSlice,
  order: orderSlice,
  favorites: favoritesSlice,
  chat: chatSlice,
  payment: paymentSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
