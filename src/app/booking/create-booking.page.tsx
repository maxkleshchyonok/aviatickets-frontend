import { Button, Container, Grid } from "@mui/material"
import { BookingTicket } from "./components/booking-ticket.comp"
import { Summary } from "./components/Summary"
import { BookingForm } from "./components/booking-form.comp"
import { useState } from "react"

export const CreateBookingPage = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <BookingTicket />
        </Grid>
        <Grid item xs={4}>
          <Summary />
        </Grid>
        <Grid item xs={8}>
          <BookingForm />
        </Grid>
      </Grid>
    </Container>
  )
}