import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFavorites, type FavoriteRes } from "@/utils/favorite"; // 경로 확인
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

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFavorites(); // 👈 이제 객체(FavoritesData)가 옴
      console.log("📦 getFavorites 응답:", response);

      // ✅ [수정] 객체 내부의 배열을 꺼내서 반환!
      if (response && response.favoriteProductResponses) {
        return response.favoriteProductResponses;
      }

      // 데이터가 없거나 형식이 다르면 빈 배열
      return [];
    } catch (error) {
      console.error("❌ getFavorites 에러:", error);

      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return [];
        }
      }
      // 에러 메시지 문자열로 변환하여 전달
      return rejectWithValue(
        error instanceof Error ? error.message : "알 수 없는 에러"
      );
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
        // ✅ Thunk에서 이미 배열을 꺼내서 리턴했으므로 그대로 사용 가능
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.favorites = [];
        state.error = (action.payload as string) || "Failed to fetch favorites";
      });
  },
});

export const { clearFavorites } = favoritesSlice.actions;

// Selector
export const selectFavorites = (state: RootState) => state.favorites.favorites;
export const selectFavoritesLoading = (state: RootState) =>
  state.favorites.isLoading;

// ✅ Selector 최적화 (배열 메서드 find/some 사용)
export const selectIsFavorite = (state: RootState, productId: number) =>
  state.favorites.favorites.some((fav) => fav.productId === productId);

export default favoritesSlice.reducer;
