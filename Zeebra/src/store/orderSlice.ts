import type { OrderRes } from "@/utils/order";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { postOrder as postOrderAPI, type OrderReq } from "../utils/order"; // API 함수 import
import { getOrders as getOrdersAPI, type OrderGetReq } from "../utils/order"; // API 함수 import
import { getOrderById as getOrderByIdAPI } from "../utils/order"; // API 함수 import

interface OrderState {
  order: OrderRes | null;
}

const initialState: OrderState = {
  order: null,
};

export const createOrder = createAsyncThunk<OrderRes, OrderReq>(
  "order/post",
  async (form: OrderReq) => {
    const response = await postOrderAPI(form);
    console.log("create order: ", response);
    return response;
  }
);

export const fetchOrders = createAsyncThunk<OrderRes, OrderGetReq>(
  "order/getOrders",
  async (form: OrderGetReq) => {
    const response = await getOrdersAPI(form);
    console.log("get order: ", response);
    return response;
  }
);

export const fetchOrder = createAsyncThunk<OrderRes, number>(
  "order/getOrder",
  async (orderId: number) => {
    const response = await getOrderByIdAPI(orderId);
    return response;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    postOrder: (state, action: PayloadAction<OrderRes>) => {
      state.order = action.payload;
    },
    getOrders: (state, action: PayloadAction<OrderRes>) => {
      state.order = action.payload;
    },
    getOrderByID: (state, action: PayloadAction<OrderRes>) => {
      state.order = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.order = action.payload;
      });
  },
});

export const { postOrder } = orderSlice.actions;
export default orderSlice.reducer;
