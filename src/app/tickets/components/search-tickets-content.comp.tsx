import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, StackProps } from "@mui/material";
import { getAllCities } from "app/cities/store/cities.actions";
import { citiesSelector } from "app/cities/store/cities.selectors";
import { tickerSearchFilterSelector } from "app/ticket-search-filter/store/ticket-search-filter.selectors";
import TickerSearchFilter from "app/ticket-search-filter/ticket-search-filter.comp";
import { TicketSearchFilterYup, ticketSearchFilterSchema } from "app/ticket-search-filter/validation-schemas/ticket-search-filter.schema";
import CenteredLoader from "components/centered-loader.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { getAllTickets } from "../store/tickets.actions";
import SearchTicketsErrorPage from "./search-tickets-page-error.comp";
import TicketList from "./ticket-list.comp";

const PAGE_SIZE = 20;

const StyledStack = styled(Stack)<StackProps>((props) => ({
  rowGap: '50px'
}));

const SearchTicketsContent = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { filter } = useAppSelector(tickerSearchFilterSelector);
  const { cities, isPending, errors } = useAppSelector(citiesSelector);

  const { control, formState: { errors: validationErrors, }, trigger, getValues } = useForm<TicketSearchFilterYup>({
    mode: "all",
    resolver: yupResolver(ticketSearchFilterSchema),
    defaultValues: { ...filter, arrivalTime: undefined, departureTime: undefined }
  });

  const handleSearchButtonClick: SubmitHandler<FieldValues> = async () => {
    const areFilterValuesValid = await trigger(["arrivalTime", "departureTime", "destinationCity", "originCity", "passengerAmount"]);
    if (!areFilterValuesValid) {
      return;
    }

    const stateValues = getValues();

    dispatch(getAllTickets({
      query: {
        ...stateValues,
        departureTime: new Date(stateValues.departureTime),
        pageNumber: currentPage,
        pageSize: PAGE_SIZE
      }
    }))
  }

  useEffect(() => {
    handleSearchButtonClick(getValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage])

  useEffect(() => {
    if (cities === null) {
      dispatch(getAllCities())
    }
  }, [dispatch, cities])

  if (isPending.cities) {
    return <CenteredLoader />;
  }

  if (errors.cities) {
    return <SearchTicketsErrorPage />;
  }

  if (!cities) {
    return null;
  }

  return (
    <StyledStack>
      <TickerSearchFilter
        onSearchButtonClick={handleSearchButtonClick}
        cities={cities}
        control={control}
        validationErrors={validationErrors}
      />
      <TicketList pageSize={PAGE_SIZE} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </StyledStack>
  )
}

export default SearchTicketsContent;