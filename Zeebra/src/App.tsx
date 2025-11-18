// App.tsx
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "@/Router";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  refetchMe,
  selectAuthLoading,
  selectIsAuthed,
} from "@/store/authSlice";
import { fetchFavorites } from "@/store/favoriteSlice";

function App() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsAuthed);
  const authLoading = useAppSelector(selectAuthLoading);

  useEffect(() => {
    dispatch(refetchMe());
  }, [dispatch]);

  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      dispatch(fetchFavorites());
    }
  }, [authLoading, isLoggedIn, dispatch]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker 등록 성공:", registration);
        })
        .catch((error) => {
          console.error("Service Worker 등록 실패:", error);
        });
    }
  }, []);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
