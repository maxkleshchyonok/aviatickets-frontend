import React, { useEffect, useState } from 'react';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails, Divider, Stack, Pagination, makeStyles, Theme } from '@mui/material';
import styled from '@emotion/styled';
import { BookingDto } from './types/types';
import FlightIcon from '@mui/icons-material/Flight';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import dayjs from 'dayjs';
import { authSelector } from 'app/auth/store/auth.selector';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import CenteredLoader from 'components/centered-loader.comp';
import BookingListError from './booking-list-error.comp';
import NoBookings from './no-bookings.comp';
import BookingDetails from './components/booking-details.comp';
import { userSelector } from 'app/user/store/user.selector';
import { getAllBookings } from 'app/user/store/user.actions';

const StyledAccordion = styled(Accordion)`
  width: 85%;
  margin-top: 2%;
  cursor: pointer;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &::before {
    position: unset;
  }
`;

const TicketHeader = styled(AccordionSummary)`
  width: 100%;
  background-color: #42a5f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  .MuiAccordionSummary-content {
    align-items: center;
    justify-content: space-evenly;
  }
`;

const StyledTypography = styled(Typography)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledDivider = styled(Divider) <{ color: string }>`
  background-color: ${({ color }) => color};
  margin: 2% 2%;
  width: 20%;
  height: 0;
  border-top: 1px solid ${({ color }) => color};
`;

const StyledStack = styled(Stack)`
  display: flex;
  align-items: center;
`;

const StatusTypography = styled(Typography) <{ status: string }>`
  color: ${({ status }) =>
    status === 'Booked' ? 'purple' : status === 'Cancelled' ? 'red' : status === 'Payed' ? 'green' : 'inherit'};
  background: white;
  padding: 1%;
  border-radius: 20px;  
`;

const StyledPagination = styled('div')`
  padding-top: 4%;
`;

const BookingsPage: React.FC = () => {
  const { bookings, count, isPending, errors } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await dispatch(getAllBookings());
        console.log(response);
      } catch (error) {
        throw new Error('Error in loading bookings');
      }
    }
    getBookings();
  }, []);

  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const params = new URLSearchParams(window.location.search);
  params.set('pageSize', String(perPage));
  params.set('pageNumber', String(page));
  window.history.replaceState({}, '', `${window.location.pathname}?${params}`);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const perPageParam = params.get('pageSize');
    const pageNumberParam = params.get('pageNumber');
    if (perPageParam) {
      const parsedPerPage = parseInt(perPageParam, 10);
      if (!isNaN(parsedPerPage) && parsedPerPage !== perPage) {
        setPerPage(parsedPerPage);
      }
    }
    if (pageNumberParam) {
      const parsedPageNumber = parseInt(pageNumberParam, 10);
      if (!isNaN(parsedPageNumber) && parsedPageNumber !== page) {
        setPage(parsedPageNumber);
      }
    }
  }, [perPage, page]);

  if (isPending.bookings) {
    return <CenteredLoader />;
  }
  if (errors.isBookings) {
    return <BookingListError />;
  }
  if (count === 0) {
    return <NoBookings title='No bookings yet. Search for a flight and add new booking!' />;
  }

  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;
  const paginatedBookings = bookings.slice(startIndex, endIndex);

  return (
    <StyledStack>
      {paginatedBookings.map((booking) => (
        <React.Fragment key={booking.id}>
          <StyledAccordion>
            <TicketHeader>
              <Typography variant="body2" component="h6" color="textSecondary">
                {dayjs(booking.routeForward[0].departureTime).format('LL')}
              </Typography>
              <Typography variant="h5" component="h2" color="white">
                {booking.origin}
              </Typography>
              <StyledDivider variant="fullWidth" color='white' />
              <Typography variant="h5" component="h2" color="white">
                {booking.destination}
              </Typography>
              {booking.routeBackward.length !== 0 && (
                <StyledTypography variant="body2" color="textSecondary">
                  <ConnectingAirportsIcon />
                  <span>Round Trip</span>
                </StyledTypography>
              )}
              <Typography variant="h5" component="h2" color="#575757">
                {booking.price} BYN
              </Typography>
              <StatusTypography variant="h6" status={booking.status}>
                {booking.status}
              </StatusTypography>
            </TicketHeader>
            <AccordionDetails>
              {booking.routeForward.map(flight => (
                <BookingDetails key={flight.id} flight={flight} />
              ))}
              {booking.routeBackward.map(flight => (
                <BookingDetails key={flight.id} flight={flight} />
              ))}
              <Stack>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Passengers:
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {booking.passengers.map((passenger) => (
                    <span key={passenger.id}> {passenger.firstName} {passenger.lastName}  </span>
                  ))}
                </Typography>
              </Stack>
            </AccordionDetails>
          </StyledAccordion>
        </React.Fragment>
      ))}
      <StyledPagination>
        <Pagination
          count={Math.ceil(count! / perPage)}
          page={page}
          onChange={handleChangePage}
        />
      </StyledPagination>
    </StyledStack>
  );
};


export default BookingsPage;