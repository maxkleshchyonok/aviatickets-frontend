export interface TicketSearchFilterState {
  originCity: string;
  destinationCity: string;
  departureTime: Date | null;
  arrivalTime: Date | null;
  passengerAmount: number;
}
