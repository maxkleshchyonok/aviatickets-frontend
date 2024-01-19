import { configureStore } from '@reduxjs/toolkit';
import { bookingSlice } from 'app/booking/store/booking.slice';

const store = configureStore({
  reducer: {
    booking: bookingSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;