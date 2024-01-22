import { TicketSearchFilterYup } from "app/ticket-search-filter/validation-schemas/ticket-search-filter.schema";
import { PaginationQueryDto } from "types/pagination-query.dto";
import { GetAllTicketsQueryDto } from "../types/get-all-tickets-query.dto";

export const formGetAllTicketsQueryFrom = (
  localFilterState: TicketSearchFilterYup,
  paginationOptions: PaginationQueryDto
): GetAllTicketsQueryDto => {
  const { arrivalTime, departureTime } = localFilterState;
  const transformedArrivalTime = { arrivalTime: arrivalTime ? new Date(arrivalTime) : undefined };

  return {
    ...localFilterState,
    departureTime: new Date(departureTime),
    ...transformedArrivalTime,
    ...paginationOptions,
  };
};
