import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getProduct as getProductAPI, type ProductDetail } from "@/utils/product";
import { getProductOption as getProductOptionAPI, type ProductOption } from "@/utils/product";


interface ProductState {
  product: ProductDetail | null;
  productOption: ProductOption | null;
}
export interface ProductOptionsReq {
  productId: number;
  colorOptionNameId: number
}

const initialState: ProductState = {
  product: null,
  productOption: null,
};

export const fetchProduct = createAsyncThunk<ProductDetail, number>(
  'product/fetch',
  async (productId: number) => {
    const response =  await getProductAPI(productId);
    return response;
  }
);

export const fetchProductOption = createAsyncThunk<ProductOption, ProductOptionsReq>(
  'product/fetchOption',
  async ({ productId, colorOptionNameId }) => {
    const response = await (getProductOptionAPI(productId, colorOptionNameId));
    console.log("product/fetchOption", productId, colorOptionNameId, "response : ", response)
    return response;
  }
)

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<ProductDetail>) => {
      state.product = action.payload;
    },
    setProductOption: (state, action: PayloadAction<ProductOption>) => {
      state.productOption = action.payload;
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
      })
      .addCase(fetchProductOption.pending, (state) => {
        state.productOption = null;
      })
      .addCase(fetchProductOption.fulfilled, (state, action) => {
        state.productOption = action.payload;
      })
      .addCase(fetchProductOption.rejected, (state) => {
        state.productOption = null;
      });
  },
});

export const { setProduct, setProductOption } = productSlice.actions;

export default productSlice.reducer;