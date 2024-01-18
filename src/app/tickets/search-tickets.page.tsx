import { Stack } from "@mui/material";
import { tickerSearchFilterSelector } from "app/ticket-search-filter/store/ticket-search-filter.selectors";
import TickerSearchFilter from "app/ticket-search-filter/ticket-search-filter.comp";
import Layout from "components/layout.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { FC, useState } from "react";
import TicketList from "./components/ticket-list.comp";
import { getAllTickets } from "./store/tickets.actions";

const PAGE_SIZE = 20;

const SearchTicketsPage: FC = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { originCity, destinationCity, departureTime, passengerAmount } = useAppSelector(tickerSearchFilterSelector);

  const handleSearchButtonClick = () => {
    const currentPage = 1;
    dispatch(getAllTickets({
      query: {
        originCity,
        destinationCity, departureTime: new Date(departureTime),
        passengerAmount,
        pageNumber: currentPage,
        pageSize: PAGE_SIZE,
      }
    }))
    setCurrentPage(currentPage);
  }

  return (
    <Layout>
      <Stack rowGap={'50px'}>
        <TickerSearchFilter onSearchButtonClick={handleSearchButtonClick}></TickerSearchFilter>
        <TicketList pageSize={PAGE_SIZE} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </Stack>
    </Layout>
  );
}

export default SearchTicketsPage;