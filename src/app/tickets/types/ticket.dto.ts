import { Cities } from "enums/cities.enum";
import { UUIDDto } from "types/uuid-dto.type";

export interface TicketDto extends UUIDDto {
  price: number;
  originCity: Cities;
  destinationCity: Cities;
  toDestinationRoute: RouteDto;
  toOriginRoute: RouteDto | null;
}

export interface RouteDto {
  id: string;
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
  status: FlightStatuses;
  price: number;
  seatAmount: number;
  availableSeatAmount: number;
}

enum FlightStatuses {
  Planned = "planned",
  Completed = "completed",
}
