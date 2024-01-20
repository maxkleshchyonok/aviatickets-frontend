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
import { ticketSearchFilterSchema } from "app/ticket-search-filter/validation-schemas/ticket-search-filter.schema";
import { useForm } from "react-hook-form";
import { citiesSelector } from "app/cities/store/cities.selectors";
import { getAllCities } from "app/cities/store/cities.actions";

const PAGE_SIZE = 20;

const StyledStack = styled(Stack)<StackProps>((props) => ({
  rowGap: '50px'
}));

const SearchTicketsPage: FC = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { filter } = useAppSelector(tickerSearchFilterSelector);
  const { cities, isPending, errors } = useAppSelector(citiesSelector);

  const { control, formState: { errors: validationErrors }, trigger } = useForm({
    mode: "all",
    resolver: yupResolver(ticketSearchFilterSchema),
    defaultValues: { ...filter, arrivalTime: undefined, departureTime: undefined, }
  });

  const handleSearchButtonClick = () => {
    trigger("originCity")
    trigger("destinationCity")
  }

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
        <TickerSearchFilter onSearchButtonClick={handleSearchButtonClick} cities={cities} control={control} validationErrors={validationErrors} />
        <TicketList pageSize={PAGE_SIZE} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </StyledStack>
    </Layout>
  );
}

export default SearchTicketsPage;