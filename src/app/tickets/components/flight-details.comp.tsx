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
  gridTemplateColumns: '3fr 1fr 3fr',
  gridAutoRows: 'min-content',
  justifyItems: 'center',
  columnGap: '30px',

  '@media(max-width: 1000px)': {
    gridTemplateColumns: '1fr',
  },

  '@media(max-width: 500px)': {
    width: '100%',
    rowGap: '16px'
  }
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