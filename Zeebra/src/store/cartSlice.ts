import { postCart as postCartAPI, type CartRes } from "@/utils/cart";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartState {
    cart: CartRes | null;
}

const initialState: CartState = {
    cart: null,
}

export const createCart = createAsyncThunk<CartRes, number>(
    'cart/post',
    async (productOptionId: number) => {
        const respose = await postCartAPI(productOptionId);
        return respose;
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        postCart: (state, action: PayloadAction<CartRes>) => {
      state.cart = action.payload;
    },
    },
    extraReducers: (builder) => {
            builder
              .addCase(createCart.pending, (state) => {
                state.cart = null;
              })
              .addCase(createCart.fulfilled, (state, action) => {
                state.cart = action.payload;
              })
              .addCase(createCart.rejected, (state) => {
                state.cart = null;
              });
    },
});

export const {postCart} = cartSlice.actions;
export default cartSlice.reducer;