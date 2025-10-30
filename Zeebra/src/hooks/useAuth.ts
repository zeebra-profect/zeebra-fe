// src/hooks/useAuth.ts
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  selectIsAuthed,
  selectAuthLoading,
  selectAuthError,
  loginThunk,
  logoutThunk,
  refetchMe,
  selectMe,
} from "@/store/authSlice";

export function useAuth() {
  const dispatch = useAppDispatch();

  const me = useAppSelector(selectMe);
  const isAuthed = useAppSelector(selectIsAuthed);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const login = (identifier: string, password: string) =>
    dispatch(loginThunk({ identifier, password }));

  const logout = () => dispatch(logoutThunk());

  const refresh = () => dispatch(refetchMe());

  return { me, isAuthed, loading, error, login, logout, refresh };
}
