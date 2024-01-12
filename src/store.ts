import { configureStore } from "@reduxjs/toolkit";
import { ticketSearchFilterSlice } from "app/ticket-search-filter/store/ticket-search-filter.slice";

const store = configureStore({
  reducer: {
    ticketSearchFilter: ticketSearchFilterSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
