import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "app/auth/store/auth.slice";
import { chatSlice } from "app/chat/store/chat.slice";
import { citiesSlice } from "app/cities/store/cities.slice";
import { ticketSearchFilterSlice } from "app/ticket-search-filter/store/ticket-search-filter.slice";
import { ticketsSlice } from "app/tickets/store/tickets.slice";
import { userSlice } from "app/user/store/user.slice";

const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    ticketSearchFilter: ticketSearchFilterSlice.reducer,
    tickets: ticketsSlice.reducer,
    cities: citiesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
