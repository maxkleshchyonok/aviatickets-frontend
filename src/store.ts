import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from 'app/auth/store/auth.slice';
import { userSlice } from 'app/user/store/user.slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;