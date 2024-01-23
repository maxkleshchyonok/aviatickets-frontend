import { BookingDto } from "app/bookings/types/types";
import { BaseState } from "types/base-state.type";

export interface UserState extends BaseState {
    isUser: boolean
    bookings: BookingDto[]
    count: number | null
    isPending: {
      bookings: boolean;
    };
    errors: {
      isBookings: string | null; 
    };
  }