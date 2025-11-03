import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCart, getCartList, type CartDataRes } from "@/utils/cart";
import { AxiosError } from "axios";

// ======================================================================
// 1. Redux 상태 정의
// ======================================================================

interface CartState {
  cartData: CartDataRes | null;
  isLoading: boolean;
  error: string | null; // ✅ 오류 메시지를 저장하는 필드
}

const initialState: CartState = {
  cartData: null,
  isLoading: false,
  error: null,
};

interface AddToCartPayload {
  productOptionId: number;
  quantity: number;
}

// ======================================================================
// 2. 비동기 Thunk 정의 (기존 로직 유지)
// ======================================================================

export const fetchCartList = createAsyncThunk<CartDataRes, void>(
  "cart/fetchList",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCartList();
      return data;
    } catch (error) {
      console.error("❌ 장바구니 목록 조회 실패:", error);
      if (error instanceof AxiosError && error.response?.status === 404) {
        return {
          cartItems: [],
          totalQuantity: 0,
          totalPrice: 0,
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

export const addToCart = createAsyncThunk<void, AddToCartPayload>(
  "cart/addItem",
  async ({ productOptionId, quantity }, { dispatch }) => {
    await addCart(productOptionId, quantity);
    await dispatch(fetchCartList()).unwrap();
  }
);

// ======================================================================
// 3. Slice 정의
// ======================================================================

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartData: (state) => {
      state.cartData = initialState.cartData;
      state.error = null; // ✅ 초기화 시 error도 null로 재설정
    },
  },
  extraReducers: (builder) => {
    builder
      // --- 목록 조회 (fetchCartList) ---
      .addCase(fetchCartList.pending, (state) => {
        state.isLoading = true;
        state.error = null; // ✅ 요청 시작 시 기존 에러 제거
      })
      .addCase(fetchCartList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null; // ✅ 성공 시 에러 제거
        state.cartData = action.payload;
      })
      .addCase(fetchCartList.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "장바구니 조회 실패";
        state.cartData = initialState.cartData;
      })
      // --- 상품 추가 (addToCart) ---
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "상품 추가 실패";
      });
  },
});

export const { clearCartData } = cartSlice.actions;

// ✅ [추가] Selector 정의: 에러 상태
export const selectCartError = (state: { cart: CartState }) => state.cart.error;

// ✅ Selector 정의 (기존 유지)
export const selectCartData = (state: { cart: CartState }) =>
  state.cart.cartData;
export const selectCartLoading = (state: { cart: CartState }) =>
  state.cart.isLoading;

export default cartSlice.reducer;
