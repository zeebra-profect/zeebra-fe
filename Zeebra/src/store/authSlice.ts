import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../utils/auth";
import { http } from "../utils/http";

export type User = {
  memberId: number;
  userLoginId: string;
  memberName: string;
  memberEmail: string;
  nickname: string;
  gender: string;
  memberBirth: string; // YYYY-MM-DD 형태로 옴
  createdTime: string; // localDateTime 형태로 옴
  profileImage: string; // 추후 추가 예정
};

type AuthState = {
  me: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  me: null,
  loading: true,
  error: null,
};

// 원래는 세션 동기화 인데 그냥 시간 지나면 로그아웃으로 처리함
export const refetchMe = createAsyncThunk("auth/refetchMe", async () => {
  const res = await http.get("members/me");
  return res.data.data as User;
});

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: { identifier: string; password: string }, { dispatch }) => {
    await login(payload);
    await dispatch(refetchMe());
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  await logout();
});

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(refetchMe.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(refetchMe.fulfilled, (s, a) => {
      s.me = a.payload;
      s.loading = false;
      s.error = null;
    });
    b.addCase(refetchMe.rejected, (s) => {
      s.me = null;
      s.loading = false;
      s.error = null;
    });

    b.addCase(loginThunk.rejected, (s, a) => {
      s.error = a.error.message ?? "로그인 실패";
    });

    b.addCase(logoutThunk.fulfilled, (s) => {
      s.me = null;
    });
  },
});

export default slice.reducer;

export const selectMe = (state: { auth: AuthState }) => state.auth.me;
export const selectIsAuthed = (state: { auth: AuthState }) => !!state.auth.me;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
