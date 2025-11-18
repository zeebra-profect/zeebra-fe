import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getStatus as getStatusAPI, subscribe as subscribeAPI, unsubscribe as unsubscribeAPI, type PushRequest, type PushStatusResponse } from "@/utils/webPush";

interface WebPushState {
    push: PushStatusResponse | null;
}

const initialState: WebPushState = {
    push: null,
}

export const fetchWebPushStatus = createAsyncThunk<PushStatusResponse>(
    "push/state",
    async () => {
        const response = await getStatusAPI();
        return response;
    }
)

export const subscribe = createAsyncThunk<void, PushRequest>(
    "pust/subscribe",
    async (form: PushRequest) => {
        const response = await subscribeAPI(form);
        return response;
    }
)

export const unsubscribe = createAsyncThunk<void>(
    "push/unsubscribe",
    async () => {
        const response = await unsubscribeAPI();
        return response;
    }
)

const pushSlice = createSlice({
    name: "push",
    initialState,
    reducers: {
        getStatus: (
            state,
            action: PayloadAction<PushStatusResponse>
        ) => {
            state.push = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWebPushStatus.fulfilled, (state, action) => {
            state.push = action.payload;
        })
    }

})

export const {getStatus} = pushSlice.actions;

export default pushSlice.reducer;