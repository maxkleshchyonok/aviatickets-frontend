import { BaseState } from "types/base-state.type";
import { TicketDto } from "./ticket.dto";

export interface TicketState extends BaseState {
  count: number | null;
  tickets: TicketDto[];
  isPending: {
    count: boolean;
    tickets: boolean;
  };
  errors: {
    count: string | null;
    tickets: string | null;
  };
}
