import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from 'app/auth/types/types';
import { forgotPassword, loginUser, registerUser, resetPassword, verifyResetCode } from 'app/auth/store/auth.actions';

const initialState: AuthState = {
  isAuth: !!sessionStorage.getItem('access_token'),
  isPending: {
    isAuth: false,
    isBookings: false,
  },
  errors: {
    isAuth: null,
    isBookings: null,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isPending.isAuth = true;
        state.errors.isAuth = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isPending.isAuth = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isPending.isAuth = false;
        state.errors.isAuth = action.error.message || null;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.isPending.isAuth = true;
        state.errors.isAuth = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isPending.isAuth = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isPending.isAuth = false;
        state.errors.isAuth = action.error.message || null;
      })
      .addCase(forgotPassword.pending, (state, action) => {
        state.isPending.isAuth = true;
        state.errors.isAuth = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isPending.isAuth = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isPending.isAuth = false;
        state.errors.isAuth = action.error.message || null;
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.isPending.isAuth = true;
        state.errors.isAuth = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isPending.isAuth = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isPending.isAuth = false;
        state.errors.isAuth = action.error.message || null;
      })
      .addCase(verifyResetCode.pending, (state, action) => {
        state.isPending.isAuth = true;
        state.errors.isAuth = null;
      })
      .addCase(verifyResetCode.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isPending.isAuth = false;
      })
      .addCase(verifyResetCode.rejected, (state, action) => {
        state.isPending.isAuth = false;
        state.errors.isAuth = action.error.message || null;
      });
  },
});

export const authReducer = authSlice.reducer;