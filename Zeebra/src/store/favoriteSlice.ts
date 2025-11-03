import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFavorites, type FavoriteRes } from "@/utils/favorite";
import { AxiosError } from "axios";
import type { RootState } from "./index";

interface FavoritesState {
  favorites: FavoriteRes[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  isLoading: false,
  error: null,
};

// 비동기 thunk - 관심상품 목록 가져오기
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFavorites();
      console.log("📦 getFavorites 응답:", data);
      console.log("📦 응답 개수:", data.length);

      if (!Array.isArray(data)) {
        console.error("❌ getFavorites가 배열이 아님:", data);
        return [];
      }

      return data;
    } catch (error) {
      // 👈 error: any 대신 catch (error) 사용

      // ❌ 에러 로깅은 catch 블록 상단에 유지
      console.error("❌ getFavorites 에러:", error);

      // ✅ error가 AxiosError 인스턴스인지 확인
      if (error instanceof AxiosError) {
        // 401 에러는 빈 배열 반환 (비로그인)
        if (error.response?.status === 401) {
          return [];
        }
      }

      // ✅ rejectWithValue로 오류를 리덕스에 전달 (원래 로직 유지)
      // AxiosError가 아니거나, 401이 아닌 다른 오류인 경우
      return rejectWithValue(error);
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload || []; // ✅ null/undefined 방어
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.favorites = []; // ✅ 에러 시 빈 배열
        state.error = action.error.message || "Failed to fetch favorites";
      });
  },
});

export const selectFavorites = (state: RootState) => state.favorites.favorites;
export const selectFavoritesLoading = (state: RootState) =>
  state.favorites.isLoading;
export const selectIsFavorite = (state: RootState, productId: number) =>
  state.favorites.favorites.some((fav) => fav.productId === productId);

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
