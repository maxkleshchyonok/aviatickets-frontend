import { StackProps, styled } from "@mui/material";
import { Stack } from "@mui/system";
import { FC } from "react";
import { TicketDto } from "../types/ticket.dto";
import RouteDetails from "./route-details.comp";

interface TicketDetailsProps {
  ticket: TicketDto;
}

const StyledTicketDetails = styled('div')((props) => ({}));
const StyledStack = styled(Stack)<StackProps>((props) => ({
  flexDirection: 'column',
  alignItems: 'center',
  columnGap: '30px',
  rowGap: '40px'
}));

const TicketDetails: FC<TicketDetailsProps> = ({ ticket }) => {
  const { toDestinationRoute, toOriginRoute } = ticket;

  return (
    <StyledTicketDetails>
      <StyledStack>
        <RouteDetails route={toDestinationRoute} originCity={toDestinationRoute.originCity} destinationCity={toDestinationRoute.destinationCity} />
        {toOriginRoute && <RouteDetails route={toOriginRoute} originCity={toOriginRoute.destinationCity} destinationCity={toOriginRoute.originCity} />}
      </StyledStack>
    </StyledTicketDetails>
  );
}

export default TicketDetails;