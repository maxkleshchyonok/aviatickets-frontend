import { TicketSearchFilterYup } from "app/ticket-search-filter/validation-schemas/ticket-search-filter.schema";
import { PaginationQueryDto } from "types/pagination-query.dto";
import { GetAllTicketsQueryDto } from "../types/get-all-tickets-query.dto";

export const formGetAllTicketsQuery = (
  filterValues: TicketSearchFilterYup,
  paginationOptions: PaginationQueryDto
): GetAllTicketsQueryDto => {
  const { arrivalTime, departureTime } = filterValues;
  const transformedArrivalTime = { arrivalTime: arrivalTime ? new Date(arrivalTime) : undefined };

  return {
    ...filterValues,
    departureTime: new Date(departureTime),
    ...transformedArrivalTime,
    ...paginationOptions,
  };
};
