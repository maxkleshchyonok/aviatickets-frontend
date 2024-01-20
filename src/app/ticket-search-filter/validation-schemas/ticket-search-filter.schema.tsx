import { object, string, ref, number, date, InferType } from "yup";

export const ticketSearchFilterSchema = object({
  originCity: string().required(),
  destinationCity: string()
    .required()
    .notOneOf([ref("originCity")], "Destination city must be different from originCity"),
  departureTime: date().required(),
  arrivalTime: date().required(),
  passengerAmount: number().required().min(1).max(10)
});


export type TicketSearchFilterYup = InferType<typeof ticketSearchFilterSchema>;
