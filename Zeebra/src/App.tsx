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

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
