import React from "react";
import { Typography, Grid, Divider } from "@mui/material";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import FlightIcon from "@mui/icons-material/Flight";
import { Route } from "../../../bookings/types/types";

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

const StyledDivider = styled(Divider)<{ color: string }>`
  background-color: ${({ color }) => color};
  margin: 2% 2%;
  width: 20%;
  height: 0;
  border-top: 1px solid ${({ color }) => color};
`;

const BookingDetails: React.FC<{ flight: Route }> = ({ flight }) => {
  return (
    <div key={flight.id}>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {flight.originCity} - {flight.destinationCity}
      </Typography>
      <FlightInfoContainer container>
        <Grid item xs={4} lg={2}>
          <Typography variant="body2" color="textSecondary">
            Departure Time:
          </Typography>
          <Typography variant="h6" color="primary">
            {dayjs(flight.departureTime).format("LLL")}
          </Typography>
        </Grid>
        <StyledDivider
          color="gray"
          variant="fullWidth"
          orientation="vertical"
          flexItem
        />
        <Grid item lg={1}>
          <FlightTimeContainer item xs={2}>
            <FlightIcon color="primary" />
            <Typography
              variant="h6"
              color="primary"
              style={{ marginLeft: "5px" }}
            >
              {dayjs(flight.arrivalTime - flight.departureTime).format("LT")}
            </Typography>
          </FlightTimeContainer>
        </Grid>
        <StyledDivider
          color="gray"
          variant="fullWidth"
          orientation="vertical"
          flexItem
        />
        <Grid item xs={4} lg={2}>
          <Typography variant="body2" color="textSecondary">
            Arrival Time:
          </Typography>
          <Typography variant="h6" color="primary">
            {dayjs(flight.arrivalTime).format("LLL")}
          </Typography>
        </Grid>
      </FlightInfoContainer>
    </div>
  );
};

export default BookingDetails;
