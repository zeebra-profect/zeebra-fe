import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// ✅ 필요한 API 함수와 상세 데이터 타입을 import
import { addCart, getCartList, type CartDataRes } from "@/utils/cart";
import { AxiosError } from "axios";

// ======================================================================
// 1. Redux 상태 정의
// ======================================================================

interface CartState {
  // 장바구니 목록의 상세 정보를 담습니다. 초기값은 null로 처리
  cartData: CartDataRes | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cartData: null,
  isLoading: false,
  error: null,
};

// ======================================================================
// 2. 비동기 Thunk 정의
// ======================================================================

// 🛒 장바구니 목록 조회 Thunk
export const fetchCartList = createAsyncThunk<CartDataRes, void>(
  "cart/fetchList",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCartList();
      return data;
    } catch (error) {
      console.error("❌ 장바구니 목록 조회 실패:", error);
      // 404 등 오류 발생 시 빈 장바구니 구조를 반환할 수 있도록 처리
      if (error instanceof AxiosError && error.response?.status === 404) {
        // 💡 장바구니가 없거나 비어있는 경우를 대비한 구조
        return {
          cartItems: [],
          totalQuantity: 0,
          totalPrice: 0,
          // 기타 필수 필드는 0이나 기본값으로 채워야 합니다.
          cartId: 0,
          discount: 0,
          totalElements: 0,
          totalPages: 0,
          currentPage: 0,
          hasNext: false,
        } as CartDataRes;
      }
      return rejectWithValue("장바구니 데이터를 불러오지 못했습니다.");
    }
  }
);

// ➕ 장바구니에 상품 추가 Thunk (기존 createCart 대체)
export const addToCart = createAsyncThunk<void, number>(
  "cart/addItem",
  async (productOptionId: number, { dispatch }) => {
    await addCart(productOptionId);

    // 상품 추가 후, 목록을 새로고침하여 최신 상태 반영
    await dispatch(fetchCartList());
  }
);

// ======================================================================
// 3. Slice 정의
// ======================================================================

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 장바구니 비우기 등 동기적 액션을 여기에 추가
    clearCartData: (state) => {
      state.cartData = initialState.cartData;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- 목록 조회 (fetchCartList) ---
      .addCase(fetchCartList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartData = action.payload; // ✅ 상세 목록 저장
      })
      .addCase(fetchCartList.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "장바구니 조회 실패";
        state.cartData = initialState.cartData; // 실패 시 데이터 초기화
      })
      // --- 상품 추가 (addToCart) ---
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.isLoading = false;
        // ✅ fetchCartList가 알아서 상태를 업데이트 해주므로 여기서는 로딩만 해제
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "상품 추가 실패";
      });
  },
});

export const { clearCartData } = cartSlice.actions;

// ✅ Selector 정의
export const selectCartData = (state: { cart: CartState }) =>
  state.cart.cartData;
export const selectCartLoading = (state: { cart: CartState }) =>
  state.cart.isLoading;

export default cartSlice.reducer;
