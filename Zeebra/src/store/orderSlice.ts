import type { OrderRes } from "@/utils/order";
import { createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import { postOrder as postOrderAPI, type OrderReq } from "../utils/order"; // API 함수 import


interface OrderState {
    order: OrderRes | null;
}

const initialState: OrderState = {
    order: null,
};

export const createOrder = createAsyncThunk<OrderRes, OrderReq>(
    'order/post',
    async (orderreq: OrderReq) => {
        const response = await postOrderAPI(orderreq);
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
    },
    extraReducers: (builder) => {
        builder
        .addCase(createOrder.fulfilled, (state, action) => {
            state.order = action.payload;
        })
    },
});

export const {postOrder} = orderSlice.actions;
export default orderSlice.reducer;


