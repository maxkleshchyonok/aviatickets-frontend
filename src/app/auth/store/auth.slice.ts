import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from 'app/auth/types/types';
import { forgotPassword, loginUser, registerUser, resetPassword, verifyResetCode } from 'app/auth/store/auth.actions';

const initialState: AuthState = {
  isAuthenticated: !!sessionStorage.getItem('access_token'),
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      sessionStorage.removeItem('access_token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action ) => {
        state.user = action.payload
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action ) => {
        state.user = action.payload
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(forgotPassword.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action ) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action ) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(verifyResetCode.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyResetCode.fulfilled, (state, action ) => {
        state.loading = false;
      })
      .addCase(verifyResetCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;