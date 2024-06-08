import { getFeedsApi, getOrdersApi } from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface FeedState {
  orders: TOrder[];
  loading: boolean;
  total: number;
  totalToday: number;
  error: null | string;
}
const initialState: FeedState = {
  orders: [],
  loading: false,
  total: 0,
  totalToday: 0,
  error: null
};
export const feedThunk = createAsyncThunk('feed/feed', getFeedsApi);
export const ordersThunk = createAsyncThunk('feed/orderFeed', getOrdersApi);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  selectors: {
    feedsSelector: (state) => state,
    ordersSelector: (state) => state.orders
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(feedThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(feedThunk.rejected, (state, { error }) => {
        state.error = error.message as string;
        state.loading = false;
      })
      .addCase(feedThunk.fulfilled, (state, { payload }) => {
        state.orders = payload.orders;
        state.loading = false;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
        state.error = null;
      })
      .addCase(ordersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ordersThunk.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(ordersThunk.fulfilled, (state, { payload }) => {
        state.orders = payload;
        state.loading = false;
        state.error = null;
      });
  }
});
export const feedReducer = feedSlice.reducer;
export const { feedsSelector, ordersSelector } = feedSlice.selectors;
