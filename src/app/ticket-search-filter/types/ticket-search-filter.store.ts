export interface TicketSearchFilterState {
  originCity: string;
  destinationCity: string;
  departureTime: number | null;
  arrivalTime: number | null;
  passengerAmount: number;
}
