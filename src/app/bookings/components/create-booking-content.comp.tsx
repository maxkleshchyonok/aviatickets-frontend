import { Grid, styled } from "@mui/material";
import TicketCard from "app/tickets/components/ticket-card.comp";
import { ticketsSelector } from "app/tickets/store/tickets.selectors";
import { useAppSelector } from "hooks/redux.hooks";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BookingTabsContent from "./booking-tabs-content.comp";
import { Summary } from "./summary.comp";

const StyledContainer = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: '3fr 1.5fr',
  gridTemplateRows: 'repeat(2, min-content)',
  gridTemplateAreas: "'ticketCard ticketSummary' 'bookingTabContent ticketSummary'",
  rowGap: '60px',
  columnGap: '70px',

  '@media(max-width: 1000px)': {
    gridTemplateAreas: 'none',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const CreateBookingContent = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const { ticketId } = useParams();
  const { tickets } = useAppSelector(ticketsSelector);

  const ticket = tickets.find((ticket) => ticket.id === ticketId);

  if (!ticket) {
    return <div>There is no such ticket</div>
  }

  return (
    <StyledContainer>
      <TicketCard ticket={ticket} />
      <Summary />
      <BookingTabsContent activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
    </StyledContainer >
  )
}

export default CreateBookingContent;
