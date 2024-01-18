import { Pagination, Stack, StackProps, styled } from "@mui/material";
import { tickerSearchFilterSelector } from "app/ticket-search-filter/store/ticket-search-filter.selectors";
import CenteredLoader from "components/centered-loader.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { calculatePageCount } from "utils/calculate-page-count.utils";
import { getAllTickets } from "../store/tickets.actions";
import { ticketsSelector } from "../store/tickets.selectors";
import TicketCards from "./ticket-cards.comp";
import TicketListError from "./ticket-list-error.comp";

const StyledTicketList = styled('section')((props) => ({}));

const StyledStack = styled(Stack)<StackProps>((props) => ({
  rowGap: '50px',
  alignItems: "center"
}));

interface TicketListProps {
  pageSize: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const TicketList: FC<TicketListProps> = ({ pageSize, currentPage, setCurrentPage }) => {
  const [isRenderBeforeFirstRequest, setIsRenderBeforeFirstRequest] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { isPending, tickets, count, errors } = useAppSelector(ticketsSelector);
  const { originCity, destinationCity, departureTime, passengerAmount } = useAppSelector(tickerSearchFilterSelector);

  const handleCurrentPageChange = (event: ChangeEvent<unknown>, page: number): void => {
    setCurrentPage(page);
    setIsRenderBeforeFirstRequest(false);
  };

  useEffect(() => {
    if (isRenderBeforeFirstRequest) {
      return;
    }

    dispatch(getAllTickets({
      query: {
        originCity,
        destinationCity,
        departureTime: new Date(departureTime),
        passengerAmount,
        pageNumber: currentPage,
        pageSize,
      }
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage])

  if (isPending.tickets) {
    return <CenteredLoader />;
  }

  if (errors.tickets) {
    return <TicketListError />;
  }

  if (count === null) {
    return <div>Let's look for tickets</div>;
  }

  if (count === 0) {
    return <div>No tickets</div>;
  }

  const pageCount = calculatePageCount(count, pageSize);

  return (
    <StyledTicketList>
      <StyledStack>
        <TicketCards tickets={tickets} />
        {pageCount > 1 && <Pagination onChange={handleCurrentPageChange} page={currentPage} count={pageCount} size="large" />}
      </StyledStack>
    </StyledTicketList>
  );
}

export default TicketList;