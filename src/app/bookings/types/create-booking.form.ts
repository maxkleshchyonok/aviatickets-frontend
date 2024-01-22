import { PassengerDto } from "aviatickets-submodule/libs/types/passenger.dto";

export interface CreateBookingForm {
  price: number;
  originCity: string;
  destinationCity: string;
  toDestinationRoute: string[];
  toOriginRoute: string[];
  passengers: PassengerDto[];
}
