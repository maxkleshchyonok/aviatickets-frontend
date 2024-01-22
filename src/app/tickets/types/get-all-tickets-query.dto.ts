import { PaginationQueryDto } from "types/pagination-query.dto";

export interface GetAllTicketsQueryDto extends PaginationQueryDto {
  originCity: string;
  destinationCity: string;
  departureTime: Date;
  arrivalTime?: Date;
  passengerAmount: number;
}
