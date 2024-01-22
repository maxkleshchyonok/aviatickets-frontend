import { Grid } from "@mui/material";
import TicketCard from "app/tickets/components/ticket-card.comp";
import { ticketsSelector } from "app/tickets/store/tickets.selectors";
import { useAppSelector } from "hooks/redux.hooks";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BookingTabsContent from "./booking-tabs-content.comp";
import { Summary } from "./summary.comp";


const CreateBookingContent = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const { ticketId } = useParams();
  const { tickets } = useAppSelector(ticketsSelector);

  const ticket = tickets.find((ticket) => ticket.id === ticketId);

  if (!ticket) {
    return <div>There is no such ticket</div>
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <TicketCard ticket={ticket}></TicketCard>
      </Grid>
      <Grid item xs={4}>
        <Summary />
      </Grid>
      <Grid item xs={8}>
        <BookingTabsContent activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
      </Grid>
    </Grid >

  )
}

export default CreateBookingContent;