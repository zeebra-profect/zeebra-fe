import {
  type PaymentApproveReq,
  type PaymentApproveResponse,
  type PaymentFailReq,
  type PaymentReq,
  type PaymentResponse,
  createPayment as createPaymentAPI,
  postApprove as postApproveAPI,
  postFail as postFailAPI,
} from "@/utils/payment";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
interface PaymentState {
  payment: PaymentResponse | null;
  paymentResult: PaymentApproveResponse | null;
}

const initialState: PaymentState = {
  payment: null,
  paymentResult: null,
};

export const createPayment = createAsyncThunk<PaymentResponse, PaymentReq>(
  "payment/createPayment",
  async (form: PaymentReq) => {
    const response = await createPaymentAPI(form);
    return response;
  }
);

export const postApprovePayment = createAsyncThunk<
  PaymentApproveResponse,
  PaymentApproveReq
>("payment/postApprove", async (form: PaymentApproveReq) => {
  const response = await postApproveAPI(form);
  return response;
});

export const postFailPayment = createAsyncThunk<
  PaymentApproveResponse,
  PaymentFailReq
>("payment/postFail", async (form: PaymentFailReq) => {
  const response = await postFailAPI(form);
  return response;
});

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    postPayment: (state, action: PayloadAction<PaymentResponse>) => {
      state.payment = action.payload;
    },
    postApprovePayment: (
      state,
      action: PayloadAction<PaymentApproveResponse>
    ) => {
      state.paymentResult = action.payload;
    },
    postFailPayment: (state, action: PayloadAction<PaymentApproveResponse>) => {
      state.paymentResult = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.payment = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.payment = action.payload;
      })
      .addCase(createPayment.rejected, (state) => {
        state.payment = null;
      })
      .addCase(postApprovePayment.pending, (state) => {
        state.paymentResult = null;
      })
      .addCase(postApprovePayment.fulfilled, (state, action) => {
        state.paymentResult = action.payload;
      })
      .addCase(postApprovePayment.rejected, (state) => {
        state.paymentResult = null;
      })
        .addCase(postFailPayment.pending, (state) => {
        state.paymentResult = null;
      })
      .addCase(postFailPayment.fulfilled, (state, action) => {
        state.paymentResult = action.payload;
      })
      .addCase(postFailPayment.rejected, (state) => {
        state.paymentResult = null;
      });
  },
});

export const { postPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
