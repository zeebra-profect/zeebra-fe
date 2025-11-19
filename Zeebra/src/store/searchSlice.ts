import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import {
  getProducts,
  type SearchReq,
  type SearchRes,
  type ProductDetailResponse,
} from "@/utils/search";
import type { RootState } from "./index";

interface SearchState {
  q: string;
  // searchResults: SearchRes | null;
  isLoading: boolean;
  error: string | null;
  products: ProductDetailResponse[];
  currentPage: number;
  totalPages: number;
}

const initialState: SearchState = {
  q: "",
  // searchResults: null,
  isLoading: false,
  error: null,
  currentPage: 0,
  totalPages: 1,
  products: [],
};

// 일반 검색용 thunk
// export const searchProducts = createAsyncThunk(
//   "search/searchProducts",
//   async (form: SearchReq, { rejectWithValue }) => {
//     try {
//       const result = await getProducts(form);
//       return result;
//     } catch (error) {
//       console.error("검색 api 호출 실패 : ", error);
//       return rejectWithValue("검색 api 호출 실패");
//     }
//   }
// );

// 무한 스크롤용 thunk
// export const fetchInfiniteProducts = createAsyncThunk(
//   "search/fetchInfiniteProducts",
//   async (form: SearchReq, { rejectWithValue }) => {
//     try {
//       const result = await getProducts(form);
//       return result.data;
//     } catch (error) {
//       console.error("검색 api 호출 실패 : ", error);
//       return rejectWithValue("검색 API 호출 실패");
//     }
//   }
// );

export const fetchProducts = createAsyncThunk<SearchRes, SearchReq>(
  "search/fetchProducts", // Thunk 이름 변경
  async (form: SearchReq, { rejectWithValue }) => {
    try {
      const result = await getProducts(form);
      return result; // 💡 응답 전체(SearchRes)를 반환 (Search.tsx가 navigate.state에 사용해야 함)
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
      // ✅ 5. fetchProducts Thunk만 처리
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        // 💡 Thunk가 SearchRes 전체를 반환하므로 .data에 접근
        const payloadData = action.payload.data;

        state.isLoading = false;
        state.q = action.meta.arg.keyWord || "";

        // ✅ 6. 데이터 누적 로직 (기존 로직 유지, 완벽함)
        if (payloadData.pagination.currentPage === 0) {
          state.products = payloadData.productDetailResponses;
        } else {
          // 중복 제거 및 누적
          const existingIds = new Set(state.products.map((p) => p.productId));
          const newProducts = payloadData.productDetailResponses.filter(
            (p) => !existingIds.has(p.productId)
          );
          state.products = [...state.products, ...newProducts];
        }

        // 페이지 정보 업데이트
        state.currentPage = payloadData.pagination.currentPage;
        state.totalPages = payloadData.pagination.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || action.error.message || "검색 실패";
      });
  },
});

export const { setSearchTerm, resetSearchState } = searchSlice.actions;

// ✅ 7. Selector 수정
export const selectSearchTerm = (state: RootState) => state.search.q;
export const selectSearchLoading = (state: RootState) => state.search.isLoading;
export const selectSearchError = (state: RootState) => state.search.error;
export const selectProducts = (state: RootState) => state.search.products;

// ✅ 8. [중요] createSelector로 셀렉터 메모이제이션 (성능 경고 해결)
export const selectSearchPagination = createSelector(
  [
    (state: RootState) => state.search.currentPage,
    (state: RootState) => state.search.totalPages,
    (state: RootState) => state.search.isLoading,
  ],
  (currentPage, totalPages, isLoading) => ({
    currentPage,
    totalPages,
    isLoading,
  })
);

export default searchSlice.reducer;
