import { createSlice } from "@reduxjs/toolkit";
import { TicketSearchFilterState } from "../types/ticket-search-filter.store";
import {
  specifyArrivalTime,
  specifyDepartureTime,
  specifyDestinationCity,
  specifyOriginCity,
  specifyPassengerAmount,
} from "./ticket-search-filter.actions";

const initialState: TicketSearchFilterState = {
  originCity: null,
  destinationCity: null,
  departureTime: null,
  arrivalTime: null,
  passengerAmount: 1,
};

export const ticketSearchFilterSlice = createSlice({
  name: "ticketSearchFilter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Specify an origin city
      .addCase(specifyOriginCity, (state, { payload }) => {
        state.originCity = payload;
      })
      // Specify a destination city
      .addCase(specifyDestinationCity, (state, { payload }) => {
        state.destinationCity = payload;
      })
      // Specify a departure time
      .addCase(specifyDepartureTime, (state, { payload }) => {
        state.departureTime = payload;
      })
      // Specify an arrival city
      .addCase(specifyArrivalTime, (state, { payload }) => {
        state.arrivalTime = payload;
      })
      // Specify a passenger amount
      .addCase(specifyPassengerAmount, (state, { payload }) => {
        state.passengerAmount = payload;
      });
  },
});
