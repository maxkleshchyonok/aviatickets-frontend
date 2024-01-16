import { configureStore } from "@reduxjs/toolkit";
import { ticketSearchFilterSlice } from "app/ticket-search-filter/store/ticket-search-filter.slice";
import { ticketsSlice } from "app/tickets/store/tickets.slice";

const store = configureStore({
  reducer: {
    ticketSearchFilter: ticketSearchFilterSlice.reducer,
    tickets: ticketsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
