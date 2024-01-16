import { createAction } from "@reduxjs/toolkit";
import { TicketSearchFilterState } from "../types/ticket-search-filter.store";

export const specifyOriginCity = createAction(
  "filter/specify-origin-city",
  (originCity: Pick<TicketSearchFilterState, "originCity">["originCity"]) => {
    return { payload: originCity };
  }
);

export const specifyDestinationCity = createAction(
  "filter/specify-destination-city",
  (destinationCity: Pick<TicketSearchFilterState, "destinationCity">["destinationCity"]) => {
    return { payload: destinationCity };
  }
);

export const specifyDepartureTime = createAction(
  "filter/add-departure-time",
  (departureTime: Pick<TicketSearchFilterState, "departureTime">["departureTime"]) => {
    return { payload: departureTime };
  }
);

export const specifyArrivalTime = createAction(
  "filter/specify-arrival-time",
  (arrivalTime: Pick<TicketSearchFilterState, "arrivalTime">["arrivalTime"]) => {
    return { payload: arrivalTime };
  }
);

export const specifyPassengerAmount = createAction(
  "filter/specify-passenger-amount",
  (passengerAmount: Pick<TicketSearchFilterState, "passengerAmount">["passengerAmount"]) => {
    return { payload: passengerAmount };
  }
);
