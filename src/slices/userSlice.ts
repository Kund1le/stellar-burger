import {
  registerUserApi,
  loginUserApi,
  logoutApi,
  updateUserApi,
  getUserApi
} from '../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export interface UserState {
  user: TUser | null;
  auth: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  auth: false,
  loading: false,
  error: null
};

export const registerThunk = createAsyncThunk('user/register', registerUserApi);
export const loginThunk = createAsyncThunk('user/login', loginUserApi);
export const logoutThunk = createAsyncThunk('user/logout', logoutApi);
export const userUpdateThunk = createAsyncThunk('user/update', updateUserApi);
export const userGetThunk = createAsyncThunk('user/get', getUserApi);

export const userSlise = createSlice({
  name: 'user',
  initialState,
  selectors: {
    stateSelector: (state) => state,
    userSelector: (state) => state.user,
    errorSelector: (state) => state.error,
    authSelector: (state) => state.auth
  },

  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerThunk.pending, (state) => {
      state.auth = false;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerThunk.rejected, (state, { error }) => {
      state.auth = false;
      state.loading = false;
      state.error = error.message as string;
    });
    builder.addCase(registerThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.error = null;
      state.auth = true;
    });
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.auth = false;
    });
    builder.addCase(loginThunk.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message as string;
      state.auth = false;
    });
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.error = null;
      state.auth = true;
    });
    builder.addCase(logoutThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.auth = true;
    });
    builder.addCase(logoutThunk.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message as string;
      state.auth = false;
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
      state.auth = false;
    });
    builder.addCase(userUpdateThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userUpdateThunk.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message as string;
    });
    builder.addCase(userUpdateThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.error = null;
    });
    builder.addCase(userGetThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.auth = false;
    });
    builder.addCase(userGetThunk.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message as string;
      state.auth = false;
    });
    builder.addCase(userGetThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.error = null;
      state.auth = true;
    });
  }
});
export const { clearError } = userSlise.actions;
export const { stateSelector, userSelector, errorSelector, authSelector } =
  userSlise.selectors;

export const userReducer = userSlise.reducer;
