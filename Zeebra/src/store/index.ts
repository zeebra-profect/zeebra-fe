import { combineReducers } from "@reduxjs/toolkit";
import notificationSlice from "./notificationSlice";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";
import favoritesSlice from "./favoriteSlice";

const rootReducer = combineReducers({
  notification: notificationSlice,
  auth: authSlice,
  product: productSlice,
  cart: cartSlice,
  order: orderSlice,
  favorites: favoritesSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
