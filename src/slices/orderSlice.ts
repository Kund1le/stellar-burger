import { getOrderByNumberApi } from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrderState {
  error: null | string;
  loading: boolean;
  order: TOrder[];
}
export const initialState: OrderState = {
  error: null,
  loading: false,
  order: []
};

export const orderThunk = createAsyncThunk('orders/order', (data: number) =>
  getOrderByNumberApi(data)
);
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  selectors: {
    orderSelector: (state) => state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(orderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderThunk.rejected, (state, { error }) => {
        state.error = error.message as string;
        state.loading = false;
      })
      .addCase(orderThunk.fulfilled, (state, { payload }) => {
        state.error = null;
        state.loading = false;
        state.order = payload.orders;
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const { orderSelector } = orderSlice.selectors;
