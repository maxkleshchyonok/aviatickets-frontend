import { Stack, styled } from '@mui/material';
import { StackProps } from '@mui/system';
import { tickerSearchFilterSelector } from 'app/ticket-search-filter/store/ticket-search-filter.selectors';
import TickerSearchFilter from 'app/ticket-search-filter/ticket-search-filter.comp'
import { getAllTickets } from 'app/tickets/store/tickets.actions';
import Layout from 'components/layout.comp';
import { useAppSelector, useAppDispatch } from 'hooks/redux.hooks';
import { useNavigate } from 'react-router-dom';

const StyledMain = styled('div')((props) => ({
  height: '99vh',
}));

const StyledFlex = styled(Stack)<StackProps>((props) => ({
  display: 'flex',
  height: '100%',
  justifyContent: 'center'
}));

export const Main = () => {
  const navigate = useNavigate();
  const { originCity, destinationCity, departureTime, passengerAmount } = useAppSelector(tickerSearchFilterSelector);
  const dispatch = useAppDispatch();

  const handleSearchButtonClick = () => {
    dispatch(getAllTickets({
      query: {
        originCity, destinationCity, departureTime: new Date(departureTime), passengerAmount, pageNumber: 1, pageSize: 20
      }
    }))

    navigate('/tickets/search');
  }

  return (
    <Layout>
      <StyledMain>
        <StyledFlex>
          <TickerSearchFilter onSearchButtonClick={handleSearchButtonClick} />
        </StyledFlex>
      </StyledMain>
    </Layout>
  )
}