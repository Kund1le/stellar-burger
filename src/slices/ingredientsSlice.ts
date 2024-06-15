import { getIngredientsApi } from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface IngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: null | string;
}
export const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};
export const ingredientsThunk = createAsyncThunk(
  'ingredients/get',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    ingredientsStateSelector: (state) => state,
    ingredientsSelector: (state) => state.ingredients
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ingredientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ingredientsThunk.rejected, (state, { error }) => {
        state.error = error.message as string;
        state.loading = false;
      })
      .addCase(ingredientsThunk.fulfilled, (state, { payload }) => {
        state.ingredients = payload;
        state.error = null;
        state.loading = false;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { ingredientsSelector, ingredientsStateSelector } =
  ingredientsSlice.selectors;
