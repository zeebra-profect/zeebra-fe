import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProducts,
  type SearchReq,
  type SearchRes,
  type ProductDetailResponse,
} from "@/utils/search";
import type { RootState } from "./index";

interface SearchState {
  q: string;
  searchResults: SearchRes | null;
  isLoading: boolean;
  error: string | null;
  products: ProductDetailResponse[];
  currentPage: number;
  totalPages: number;
}

const initialState: SearchState = {
  q: "",
  searchResults: null,
  isLoading: false,
  error: null,
  currentPage: 0,
  totalPages: 1,
  products: [],
};

// 일반 검색용 thunk
export const searchProducts = createAsyncThunk(
  "search/searchProducts",
  async (form: SearchReq, { rejectWithValue }) => {
    try {
      const result = await getProducts(form);
      return result;
    } catch (error) {
      console.error("검색 api 호출 실패 : ", error);
      return rejectWithValue("검색 api 호출 실패");
    }
  }
);

// 무한 스크롤용 thunk
export const fetchInfiniteProducts = createAsyncThunk(
  "search/fetchInfiniteProducts",
  async (form: SearchReq, { rejectWithValue }) => {
    try {
      const result = await getProducts(form);
      return result.data;
    } catch (error) {
      console.error("검색 api 호출 실패 : ", error);
      return rejectWithValue("검색 API 호출 실패");
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.q = action.payload;
    },
    resetSearchState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      // 무한 스크롤 thunk 처리
      .addCase(fetchInfiniteProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInfiniteProducts.fulfilled, (state, action) => {
        const payloadData = action.payload;

        state.isLoading = false;
        state.q = action.meta.arg.keyWord || "";

        // 0페이지 요청(새 검색)일 경우 목록을 덮어쓰기
        if (payloadData.pagination.currentPage === 0) {
          state.products = payloadData.productDetailResponses;
        } else {
          // 기존 목록에 중복 제거하면서 새 상품 추가
          const existingIds = new Set(state.products.map((p) => p.productId));
          const newProducts = payloadData.productDetailResponses.filter(
            (p) => !existingIds.has(p.productId)
          );
          state.products = [...state.products, ...newProducts];
        }

        // 페이지 정보 업데이트
        state.currentPage = payloadData.pagination.currentPage;
        state.totalPages = payloadData.pagination.totalPages;
        state.searchResults = null;
      })
      .addCase(fetchInfiniteProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || action.error.message || "검색 실패";
      })
      // 일반 검색 thunk 처리 (기존에 있던 것)
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || action.error.message || "검색 실패";
      });
  },
});

export const { setSearchTerm, resetSearchState } = searchSlice.actions;

export const selectSearchTerm = (state: RootState) => state.search.q;
export const selectSearchLoading = (state: RootState) => state.search.isLoading;
export const selectSearchError = (state: RootState) => state.search.error;
export const selectProducts = (state: RootState) => state.search.products;
export const selectSearchPagination = (state: RootState) => ({
  currentPage: state.search.currentPage,
  totalPages: state.search.totalPages,
  isLoading: state.search.isLoading,
});

export default searchSlice.reducer;
