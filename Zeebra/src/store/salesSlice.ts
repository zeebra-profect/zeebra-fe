import { postSales as postSalesAPI, type SalesRequest, type SalesResponse } from "@/utils/sales";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SalesState{
    sales: SalesResponse | null;
}

const initialState: SalesState = {
  sales: null,
};

export const createSales = createAsyncThunk<SalesResponse, SalesRequest>(
    'sales/post',
    async (salesreq: SalesRequest) => {
        const response = await postSalesAPI(salesreq);
        return response;
    }
);

const salesSlice = createSlice({
    name: "sales",
    initialState,
    reducers: {
        postSales: (state, action: PayloadAction<SalesResponse>) => {
            state.sales = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(createSales.fulfilled, (state, action) => {
            state.sales = action.payload;
        })
    }

});

export const {postSales} = salesSlice.actions;
export default salesSlice.reducer;
