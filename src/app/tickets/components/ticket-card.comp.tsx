import { styled } from "@mui/system";
import { FC } from "react";
import { TicketDto } from "../types/ticket.dto";
import TicketJourneyPreview from "./ticket-journey-preview.comp";

interface TicketCardProps {
  ticket: TicketDto;
}

const StyledTicketCard = styled('div')((props) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '20px',
  border: '1px solid lightgray',
  borderRadius: '10px',
  padding: '20px'
}));

const StyledTicketJourneys = styled('div')((props) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '30px',
}));

const StyledTicketPrice = styled('div')((props) => ({
  fontSize: '24px',
  alignSelf: 'center'
}));

const StyledDivider = styled('div')((props) => ({
  borderBottom: '1px solid lightgray'
}));

const TicketCard: FC<TicketCardProps> = ({ ticket }) => {
  return (
    <StyledTicketCard>
      <StyledTicketJourneys>
        <TicketJourneyPreview route={ticket.toDestinationRoute} destinationCity={ticket.destinationCity} originCity={ticket.originCity} />
        {ticket.toOriginRoute ?
          <TicketJourneyPreview route={ticket.toOriginRoute} destinationCity={ticket.originCity} originCity={ticket.destinationCity} /> : null
        }
      </StyledTicketJourneys>
      <StyledDivider />
      <StyledTicketPrice>${ticket.price}</StyledTicketPrice>
    </StyledTicketCard >
  );
}

export default TicketCard;