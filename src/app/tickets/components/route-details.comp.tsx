import { StackProps, styled, Stack, Typography, TypographyProps } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import { RouteDto } from "../types/ticket.dto";
import FlightDetails from "./flight-details.comp";

interface RouteDetailsProps {
  route: RouteDto;
  originCity: string;
  destinationCity: string;
}

const StyledRouteDetails = styled('div')((props) => ({
  width: '100%'
}));

const StyledStack = styled(Stack)<StackProps>((props) => ({
  alignItems: 'center',
  rowGap: '20px',
  width: '100%',
}));

const StyledKeyRouteSpots = styled(Typography)<TypographyProps>((props) => ({
  fontSize: '1.1rem',
  fontWeight: 600
}));

const StyledFlightStack = styled(Stack)<StackProps>((props) => ({
  rowGap: '20px',
  width: '100%',
  maxWidth: '1000px'
}));

const RouteDetails: FC<RouteDetailsProps> = ({ route, originCity, destinationCity }) => {
  const totalFlightTime = dayjs(route.arrivalTime).format('LT');
  
  return (
    <StyledRouteDetails>
      <StyledStack>
        <StyledKeyRouteSpots>{originCity} - {destinationCity} | {totalFlightTime}</StyledKeyRouteSpots>
        <StyledFlightStack>
          {route.flights.map((flight) => <FlightDetails flight={flight} key={flight.id} />)}
        </StyledFlightStack>
      </StyledStack>
    </StyledRouteDetails >
  )
}

export default RouteDetails;