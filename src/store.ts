import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "aviatickets-submodule/auth/store/auth.slice";
import { chatSlice } from "app/chat/store/chat.slice";
import { citiesSlice } from "aviatickets-submodule/cities/store/cities.slice";
import { ticketSearchFilterSlice } from "aviatickets-submodule/ticket-search-filter/store/ticket-search-filter.slice";
import { ticketsSlice } from "aviatickets-submodule/tickets/store/tickets.slice";

const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
    auth: authSlice.reducer,
    ticketSearchFilter: ticketSearchFilterSlice.reducer,
    tickets: ticketsSlice.reducer,
    cities: citiesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
