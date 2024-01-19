import React, { useState } from 'react';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails, Divider, Stack } from '@mui/material';
import styled from '@emotion/styled';
import { BookingDto } from './types/types';
import FlightIcon from '@mui/icons-material/Flight';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import dayjs from 'dayjs';

const arr: BookingDto[] = [
  {
    id: '423i4iewkmrdkl',
    status: 'Booked',
    price: 1234,
    createdAt: 123,
    updatedAt: 123,
    user: {
      id: 'se324j32enmr3124n',
      firstName: "John",
      lastName: "Doe",
      email: 'esi@gmial.com',
      createdAt: 123,
      updatedAt: 123,
      roleId: '12312das',
      roleType: 'Admin'
    },
    routeForward: [
      {
        id: "ejjdosa",
        originCity: 'Mexico',
        destinationCity: 'Los Angeles',
        departureTime: 1702449453367,
        arrivalTime: 1702449453367,
        status: "Planned",
        price: 624,
        seatAmount: 50,
        availableSeatAmount: 20,
        createdAt: 123,
        updatedAt: 123,
      },
      {
        id: "ejjdosar",
        originCity: 'Los Angeles',
        destinationCity: 'New York',
        departureTime: 1702449453367,
        arrivalTime: 1702449453367,
        status: "Planned",
        price: 624,
        seatAmount: 50,
        availableSeatAmount: 20,
        createdAt: 123,
        updatedAt: 123,
      },
    ],
    routeBackward: [
      {
        id: "de3miofmdsak",
        originCity: 'Los Angeles',
        destinationCity: 'Mexico',
        departureTime: 1702449453367,
        arrivalTime: 1702449453367,
        status: "Planned",
        price: 624,
        seatAmount: 50,
        availableSeatAmount: 20,
        createdAt: 123,
        updatedAt: 123,
      },

    ],
    origin: 'Mexico',
    destination: 'Los Angeles',
    passengers: [
      {
        id: "dsmdi1dmisa",
        firstName: 'Peter',
        lastName: 'Griffin',
        passportId: 's',
        createdAt: 123,
        updatedAt: 123,
      },
      {
        id: "dwondjsa",
        firstName: 'Rick',
        lastName: 'Sanchez',
        passportId: 's',
        createdAt: 123,
        updatedAt: 123,
      }
    ]
  },
  {
    id: 'a4123i4iewkfweqmrdkl',
    status: 'Cancelled',
    price: 2224,
    createdAt: 123,
    updatedAt: 123,
    user: {
      id: 'kfodf901f9ksdf',
      firstName: "JMister",
      lastName: "Bean",
      createdAt: 123,
      updatedAt: 123,
      email: 'e1kdsa@tut.by',
      roleId: '12312das',
      roleType: 'Admin'
    },
    routeForward: [
      {
        id: "dio",
        originCity: 'Mexico',
        destinationCity: 'Los Angeles',
        departureTime: 1702449453367,
        arrivalTime: 1702449453367,
        status: "Planned",
        price: 624,
        seatAmount: 50,
        availableSeatAmount: 20,
        createdAt: 123,
        updatedAt: 123,
      },

    ],
    routeBackward: [
      {
        id: "dwq",
        originCity: 'Los Angeles',
        destinationCity: 'Mexico',
        departureTime: 1702449453367,
        arrivalTime: 1702449453367,
        status: "Planned",
        price: 624,
        seatAmount: 50,
        availableSeatAmount: 20,
        createdAt: 123,
        updatedAt: 123,
      },

    ],
    origin: 'Mexico',
    destination: 'Los Angeles',
    passengers: [
      {
        id: "1",
        firstName: 'Peter',
        lastName: 'Griffin',
        passportId: 's',
        createdAt: 123,
        updatedAt: 123,
      },
      {
        id: "2",
        firstName: 'Rick',
        lastName: 'Sanchez',
        passportId: 's',
        createdAt: 123,
        updatedAt: 123,
      }
    ]
  },
  {
    id: '423i4iewgmrdkl',
    status: 'Payed',
    price: 1234,
    createdAt: 123,
    updatedAt: 123,
    user: {
      id: 'se324j32enmr3124n',
      firstName: "John",
      lastName: "Doe",
      email: 'esi@gmial.com',
      createdAt: 123,
      updatedAt: 123,
      roleId: '12312das',
      roleType: 'Admin'
    },
    routeForward: [
      {
        id: "ejjdosa",
        originCity: 'Mexico',
        destinationCity: 'Los Angeles',
        departureTime: 1702449453367,
        arrivalTime: 1702449453367,
        status: "Planned",
        price: 624,
        seatAmount: 50,
        availableSeatAmount: 20,
        createdAt: 123,
        updatedAt: 123,
      },

    ],
    routeBackward: [],
    origin: 'Mexico',
    destination: 'Los Angeles',
    passengers: [
      {
        id: "dsmdi1dmisa",
        firstName: 'Peter',
        lastName: 'Griffin',
        passportId: 's',
        createdAt: 123,
        updatedAt: 123,
      },
      {
        id: "dwondjsa",
        firstName: 'Rick',
        lastName: 'Sanchez',
        passportId: 's',
        createdAt: 123,
        updatedAt: 123,
      }
    ]
  },
]

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
  background-color: #f2f2f2;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  .MuiAccordionSummary-content {
    align-items: center;
    justify-content: space-evenly;
  }
`;

const FlightInfoContainer = styled(Grid)`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const FlightTimeContainer = styled(Grid)`
  display: flex;
  align-items: center;
`;

const StyledTypography = styled(Typography)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledDivider = styled(Divider)`
  background-color: rgb(171, 190, 245);
  margin: 2% 2%;
  width: 20%;
  height: 0;
  border-top: 1px solid rgb(171, 190, 245);
`;

const StyledStack = styled(Stack)`
  display: flex;
  align-items: center;
`;

const StatusTypography = styled(Typography)<{ status: string }>`
  color: ${({ status }) =>
    status === 'Booked' ? 'purple' : status === 'Cancelled' ? 'red' : status === 'Payed' ? 'green' : 'inherit'};
`;

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState(arr);

  return (
    <StyledStack>
      {bookings.map((booking) => (
        <React.Fragment key={booking.id}>
          <StyledAccordion>
            <TicketHeader>
              <Typography variant="body2" component="h6" color="textSecondary">
                {dayjs(booking.routeForward[0].departureTime).format('LL')}
              </Typography>
              <Typography variant="h5" component="h2" color="primary">
                {booking.origin}
              </Typography>
              <StyledDivider variant="fullWidth" />
              <Typography variant="h5" component="h2" color="primary">
                {booking.destination}
              </Typography>
              {booking.routeBackward.length !== 0 && (
                <StyledTypography variant="body2" color="textSecondary">
                  <ConnectingAirportsIcon />
                  <span>Round Trip</span>
                </StyledTypography>
              )}
              <Typography variant="h5" component="h2" color="#1a237e">
                {booking.price} BYN
              </Typography>
              <StatusTypography variant="h6" status={booking.status}>
                {booking.status}
              </StatusTypography>
            </TicketHeader>
            <AccordionDetails>
              {booking.routeForward.map(flight => (
                <div>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    {flight.originCity} - {flight.destinationCity}
                  </Typography>
                  <FlightInfoContainer container>
                    <Grid item xs={4} lg={2}>
                      <Typography variant="body2" color="textSecondary">
                        Departure Time:
                      </Typography>
                      <Typography variant="h6" color="primary">
                        {dayjs(flight.departureTime).format('LLL')}
                      </Typography>
                    </Grid>
                    <StyledDivider variant="fullWidth" orientation="vertical" flexItem />
                    <Grid item lg={1}>
                      <FlightTimeContainer item xs={2}>
                        <FlightIcon color="primary" />
                        <Typography variant="h6" color="primary" style={{ marginLeft: '5px' }}>
                          {dayjs(flight.arrivalTime - flight.departureTime).format('LT')}
                        </Typography>
                      </FlightTimeContainer>
                    </Grid>
                    <StyledDivider variant="fullWidth" orientation="vertical" flexItem />
                    <Grid item xs={4} lg={2}>
                      <Typography variant="body2" color="textSecondary">
                        Arrival Time:
                      </Typography>
                      <Typography variant="h6" color="primary">
                        {dayjs(flight.arrivalTime).format('LLL')}
                      </Typography>
                    </Grid>
                  </FlightInfoContainer>
                </div>
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
    </StyledStack>
  );
};


export default BookingsPage;