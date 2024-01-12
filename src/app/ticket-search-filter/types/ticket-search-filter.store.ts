export interface TicketSearchFilterState {
  originCity: string | null;
  destinationCity: string | null;
  departureTime: Date | null;
  arrivalTime: Date | null;
  passengerAmount: number;
}
