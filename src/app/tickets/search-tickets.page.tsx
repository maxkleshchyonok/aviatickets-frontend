import { Stack, styled } from "@mui/material";
import { StackProps } from "@mui/system";
import { tickerSearchFilterSelector } from "app/ticket-search-filter/store/ticket-search-filter.selectors";
import TickerSearchFilter from "app/ticket-search-filter/ticket-search-filter.comp";
import Layout from "components/layout.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { FC, useState } from "react";
import TicketList from "./components/ticket-list.comp";
import { getAllTickets } from "./store/tickets.actions";

const PAGE_SIZE = 20;

const StyledStack = styled(Stack)<StackProps>((props) => ({
  rowGap: '50px'
}));

const SearchTicketsPage: FC = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { originCity, destinationCity, departureTime, passengerAmount } = useAppSelector(tickerSearchFilterSelector);

  const handleSearchButtonClick = () => {
    const currentPage = 1;
    dispatch(getAllTickets({
      query: {
        originCity,
        destinationCity,
        departureTime: new Date(departureTime),
        passengerAmount,
        pageNumber: currentPage,
        pageSize: PAGE_SIZE,
      }
    }))
    setCurrentPage(currentPage);
  }

  return (
    <Layout>
      <StyledStack>
        <TickerSearchFilter onSearchButtonClick={handleSearchButtonClick} />
        <TicketList pageSize={PAGE_SIZE} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </StyledStack>
    </Layout>
  );
}

export default SearchTicketsPage;