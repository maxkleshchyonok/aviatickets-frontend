import { createAction } from "@reduxjs/toolkit";

export const specifyOriginCity = createAction("filter/specify-origin-city", (originCity: string) => {
  return { payload: originCity };
});

export const specifyDestinationCity = createAction("filter/specify-destination-city", (destinationCity: string) => {
  return { payload: destinationCity };
});

export const specifyDepartureTime = createAction("filter/add-departure-time", (departureTime: Date) => {
  return { payload: departureTime };
});

export const specifyArrivalTime = createAction("filter/specify-arrival-time", (arrivalTime: Date) => {
  return { payload: arrivalTime };
});

export const specifyPassengerAmount = createAction("filter/specify-passenger-amount", (passengerAmount: number) => {
  return { payload: passengerAmount };
});
