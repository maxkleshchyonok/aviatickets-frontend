import { styled } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import { FlightDto } from "../types/ticket.dto";
import FlightSpot from "./flight-spot.comp";

interface FlightDetailsProps {
  flight: FlightDto;
}

const StyledFlightDetails = styled('div')((props) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridAutoRows: 'min-content',
  justifyItems: 'center',
  columnGap: '30px'
}));
const StyledFlightTime = styled('div')((props) => ({}));

const FlightDetails: FC<FlightDetailsProps> = ({ flight }) => {
  const { arrivalTime, departureTime, originCity, destinationCity } = flight;

  return (
    <StyledFlightDetails>
      <FlightSpot time={departureTime} city={originCity} />
      <StyledFlightTime>{dayjs(arrivalTime).format('LT')}</StyledFlightTime>
      <FlightSpot time={arrivalTime} city={destinationCity} />
    </StyledFlightDetails>
  );
}

export default FlightDetails;