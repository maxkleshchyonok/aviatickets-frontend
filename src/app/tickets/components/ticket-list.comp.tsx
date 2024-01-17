import { Stack } from "@mui/material";
import CenteredLoader from "components/centered-loader.comp";
import { useAppSelector } from "hooks/redux.hooks";
import { FC } from "react";
import { ticketsSelector } from "../store/tickets.selectors";
import TicketCards from "./ticket-cards.comp";

const TicketList: FC = () => {
  const { isPending, tickets } = useAppSelector(ticketsSelector);

  return (
    <section className="ticket-list">
      <Stack alignItems="center" spacing="50px">
        {isPending.tickets ? <CenteredLoader /> : <TicketCards tickets={tickets} />}
      </Stack>
    </section>
  );
}

export default TicketList;