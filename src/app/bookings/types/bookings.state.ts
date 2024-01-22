import { BaseState } from "types/base-state.type";
import { BookingDto } from "./booking.dto";

export interface BookingState extends BaseState {
  booking: BookingDto | null;
  isPending: {
    booking: boolean;
  };
  errors: {
    booking: string | null;
  };
}
