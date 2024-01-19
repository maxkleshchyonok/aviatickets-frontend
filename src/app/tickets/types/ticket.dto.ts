import { Cities } from "enums/cities.enum";
import { UUIDDto } from "types/uuid-dto.type";

export interface TicketDto extends UUIDDto {
  id: string;
  price: number;
  toDestinationRoute: RouteDto;
  toOriginRoute: RouteDto | null;
}

export interface RouteDto {
  originCity: Cities;
  destinationCity: Cities;
  travelTime: number;
  price: number;
  stops: number;
  arrivalTime: number;
  departureTime: number;
  flights: FlightDto[];
}

export interface FlightDto extends UUIDDto {
  originCity: Cities;
  destinationCity: Cities;
  departureTime: number;
  arrivalTime: number;
  flightTime: number;
  status: FlightStatuses;
  price: number;
  seatAmount: number;
  availableSeatAmount: number;
}

enum FlightStatuses {
  Planned = "planned",
  Completed = "completed",
}
