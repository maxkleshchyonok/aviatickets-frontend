import { Cities } from "enums/cities.enum";
import { PaginationQueryDto } from "types/pagination-query.dto";

export interface GetAllTicketsQueryDto extends PaginationQueryDto {
  originCity: Cities;
  destinationCity: Cities;
  departureTime: Date;
  arrivalTime?: Date;
  passengerAmount: number;
}
