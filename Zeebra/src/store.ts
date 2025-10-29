import { configureStore } from '@reduxjs/toolkit';
import rootReducers from './modules/index';


const store = configureStore ({
    reducer: rootReducers,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: true, // 개발환경이면 true, 배포 시 false로 바꿔도 됨
}
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;