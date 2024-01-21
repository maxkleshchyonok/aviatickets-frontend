import { object, string, ref, number, date, InferType } from "yup";
import { PassengerAmount } from "../constants/passenger-amount.constants";


export const ticketSearchFilterSchema = object({
  originCity: string().required(),
  destinationCity: string()
    .required()
    .notOneOf([ref("originCity")], "Destination city must be different from originCity"),
  departureTime: date().required(),
  arrivalTime: date().optional().min(
    ref('departureTime'),
    "arrival date must be later than departure date"
  ),
  passengerAmount: number().required().min(PassengerAmount.Min).max(PassengerAmount.Max)
});


export type TicketSearchFilterYup = InferType<typeof ticketSearchFilterSchema>;
