import { Stack } from "@mui/material";
import { tickerSearchFilterSelector } from "app/ticket-search-filter/store/ticket-search-filter.selectors";
import TickerSearchFilter from "app/ticket-search-filter/ticket-search-filter.comp";
import Layout from "components/layout.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { FC } from "react";
import TicketList from "./components/ticket-list.comp";
import { getAllTickets } from "./store/tickets.actions";

const SearchTicketsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { originCity, destinationCity, departureTime, passengerAmount } = useAppSelector(tickerSearchFilterSelector);
  const handleSearchButtonClick = () => {
    dispatch(getAllTickets({
      query: {
        originCity, destinationCity, departureTime: new Date(departureTime), passengerAmount, pageNumber: 1, pageSize: 20
      }
    }))
  }

  return (
    <Layout>
      <Stack rowGap={'50px'}>
        <TickerSearchFilter onSearchButtonClick={handleSearchButtonClick}></TickerSearchFilter>
        <TicketList />
      </Stack>
    </Layout>
  );
}

export default SearchTicketsPage;