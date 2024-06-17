import { orderBurgerApi } from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface NewOrderState {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
}

export const initialState: NewOrderState = {
  order: null,
  loading: false,
  error: null
};

export const newOrderThunk = createAsyncThunk(
  'order/newOrder',
  async (data: string[]) => orderBurgerApi(data)
);
export const orderSlice = createSlice({
  name: 'newOrder',
  initialState,
  selectors: {
    newOrderSelector: (state) => state
  },
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(newOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(newOrderThunk.rejected, (state, { error }) => {
        state.error = error.message as string;
        state.loading = false;
      })
      .addCase(newOrderThunk.fulfilled, (state, { payload }) => {
        state.error = null;
        state.order = payload.order;
        state.loading = false;
      });
  }
});

export const newOrderReducer = orderSlice.reducer;
export const { newOrderSelector } = orderSlice.selectors;
export const { clearOrder } = orderSlice.actions;
