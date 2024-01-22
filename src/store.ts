import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "app/auth/store/auth.slice";
import { bookingSlice } from "app/bookings/store/booking.slice";
import { chatSlice } from "app/chat/store/chat.slice";
import { citiesSlice } from "app/cities/store/cities.slice";
import { ticketSearchFilterSlice } from "app/ticket-search-filter/store/ticket-search-filter.slice";
import { ticketsSlice } from "app/tickets/store/tickets.slice";

const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
    auth: authSlice.reducer,
    ticketSearchFilter: ticketSearchFilterSlice.reducer,
    tickets: ticketsSlice.reducer,
    cities: citiesSlice.reducer,
    booking: bookingSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
