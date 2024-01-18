import { Pagination, Stack } from "@mui/material";
import { tickerSearchFilterSelector } from "app/ticket-search-filter/store/ticket-search-filter.selectors";
import CenteredLoader from "components/centered-loader.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { calculatePageCount } from "utils/calculate-page-count.utils";
import { getAllTickets } from "../store/tickets.actions";
import { ticketsSelector } from "../store/tickets.selectors";
import TicketCards from "./ticket-cards.comp";

const PAGE_SIZE = 20;

const TicketList: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isRenderBeforeFirstRequest, setIsRenderBeforeFirstRequest] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { isPending, tickets, count, errors } = useAppSelector(ticketsSelector);
  const { originCity, destinationCity, departureTime, arrivalTime, passengerAmount } = useAppSelector(tickerSearchFilterSelector);

  console.log(originCity, destinationCity, departureTime, arrivalTime, passengerAmount)

  const handleCurrentPageChange = (event: ChangeEvent<unknown>, page: number): void => {
    setCurrentPage(page);
    setIsRenderBeforeFirstRequest(false);
  };

  useEffect(() => {
    if (!isRenderBeforeFirstRequest) {
      dispatch(getAllTickets({
        query: {
          originCity, destinationCity, departureTime: new Date(departureTime), passengerAmount,
          pageNumber: currentPage,
          pageSize: PAGE_SIZE,
        }
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage])

  if (isPending.tickets) {
    return <CenteredLoader />
  }

  if (errors.tickets) {
    return <div>Error</div>
  }

  if (count === null) {
    return <div>Let's look for tickets</div>
  }

  if (count === 0) {
    return <div>No tickets</div>
  }

  const pageCount = calculatePageCount(count, PAGE_SIZE);

  return (
    <section className="ticket-list">
      <Stack alignItems="center" spacing="50px">
        <TicketCards tickets={tickets} />
        {pageCount > 1 && <Pagination onChange={handleCurrentPageChange} page={currentPage} count={pageCount} size="large" />}
      </Stack>
    </section>
  );
}

export default TicketList;