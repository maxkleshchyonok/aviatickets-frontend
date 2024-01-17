import { Stack, StackProps, styled } from "@mui/material";
import { FC } from "react";
import { TicketDto } from "../types/ticket.dto";
import TicketCard from "./ticket-card.comp";

interface TicketCardsProps {
  tickets: TicketDto[];
}

const StyledTicketCards = styled(Stack)<StackProps>((props) => ({
  width: '100%',
  rowGap: '40px'
}));

const TicketCards: FC<TicketCardsProps> = ({ tickets }) => {
  return (
    <StyledTicketCards>
      {tickets.map(ticket => {
        const ticketId = ticket.id;
        return <TicketCard ticket={ticket} key={ticketId} />
      })}
    </StyledTicketCards>
  );
}

export default TicketCards;