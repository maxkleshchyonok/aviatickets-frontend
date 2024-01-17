import Stack from "@mui/material/Stack";
import { FC } from "react";
import { TicketDto } from "../types/ticket.dto";
import TicketCard from "./ticket-card.comp";

interface TicketCardsProps {
  tickets: TicketDto[];
}

const TicketCards: FC<TicketCardsProps> = ({ tickets }) => {
  return (
    <Stack sx={{ 'width': '100%' }}>
      {tickets.map(ticket => {
        const ticketId = ticket.id;
        return (
          <TicketCard ticket={ticket} key={ticketId} />
        )
      })}
    </Stack>
  );
}

export default TicketCards;