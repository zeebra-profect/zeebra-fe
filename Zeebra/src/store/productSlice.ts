import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getProduct as getProductAPI, type ProductDetail } from "@/utils/product";


interface ProductState {
  product: ProductDetail | null;
}

const initialState: ProductState = {
  product: null,
};

export const fetchProduct = createAsyncThunk<ProductDetail, number>(
  'product/fetch',
  async (productId: number) => {
    const response =  await getProductAPI(productId);
    return response;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<ProductDetail>) => {
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.product = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.product = null;
      });
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;