import { combineReducers, configureStore } from "@reduxjs/toolkit";

// 1. 🔽 [먼저] 모든 Slice를 import 합니다.
import notificationSlice from "./notificationSlice";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";
import favoritesSlice from "./favoriteSlice";
import chatSlice from "./chatSlice";
import paymentSlice from "./paymentSlice";
import searchSlice from "./searchSlice";

// 2. 🔽 [중간] rootReducer를 정의합니다.
const rootReducer = combineReducers({
  notification: notificationSlice,
  auth: authSlice,
  product: productSlice,
  cart: cartSlice,
  order: orderSlice,
  favorites: favoritesSlice,
  chat: chatSlice,
  payment: paymentSlice,
  search: searchSlice,
});

// 3. 🔽 [마지막] 정의된 rootReducer를 사용하여 store를 생성하고 export합니다.
export const store = configureStore({
  reducer: rootReducer,
});

// 4. 🔽 타입들을 export 합니다.
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// 5. 🔽 (선택 사항) rootReducer의 default export는 더 이상 필요하지 않을 수 있습니다.
export default rootReducer;
