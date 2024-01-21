import { Stack, styled } from "@mui/material";
import { StackProps } from "@mui/system";
import { tickerSearchFilterSelector } from "app/ticket-search-filter/store/ticket-search-filter.selectors";
import TickerSearchFilter from "app/ticket-search-filter/ticket-search-filter.comp";
import CenteredLoader from "components/centered-loader.comp";
import Layout from "components/layout.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { FC, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import SearchTicketsErrorPage from "./components/search-tickets-page-error.comp";
import TicketList from "./components/ticket-list.comp";
import { ticketSearchFilterSchema, TicketSearchFilterYup } from "app/ticket-search-filter/validation-schemas/ticket-search-filter.schema";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { citiesSelector } from "app/cities/store/cities.selectors";
import { getAllCities } from "app/cities/store/cities.actions";
import { getAllTickets } from "./store/tickets.actions";

const PAGE_SIZE = 20;

const StyledStack = styled(Stack)<StackProps>((props) => ({
  rowGap: '50px'
}));

const SearchTicketsPage: FC = () => {
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
    return (
      <Layout>
        <CenteredLoader />
      </Layout>
    )
  }

  if (errors.cities) {
    return (
      <Layout>
        <SearchTicketsErrorPage />
      </Layout>
    )
  }

  if (!cities) {
    return null;
  }

  return (
    <Layout>
      <StyledStack>
        <TickerSearchFilter
          onSearchButtonClick={handleSearchButtonClick}
          cities={cities}
          control={control}
          validationErrors={validationErrors}
        />
        <TicketList pageSize={PAGE_SIZE} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </StyledStack>
    </Layout>
  );
}

export default SearchTicketsPage;