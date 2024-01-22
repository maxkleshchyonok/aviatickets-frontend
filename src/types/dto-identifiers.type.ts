import { TicketDto } from "app/tickets/types/ticket.dto";

export type TicketDtoIdentifier = Pick<TicketDto, "id">["id"];
