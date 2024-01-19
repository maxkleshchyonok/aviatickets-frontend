import styled from "@emotion/styled";
import { FC } from "react";
import { TicketDto } from "../types/ticket.dto";
import TicketJourneyPreview from "./ticket-journey-preview.comp";

interface TicketCardPreviewProps {
  ticket: TicketDto;
}

const StyledTicketCard = styled('div')((props) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '20px',
  padding: '20px',
  width: '100%'
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

const TicketCardPreview: FC<TicketCardPreviewProps> = ({ ticket }) => {
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

export default TicketCardPreview;