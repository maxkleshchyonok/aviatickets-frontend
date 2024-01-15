import { Button, Container, Grid } from "@mui/material"
import { BookingTicket } from "./components/booking-ticket.comp"
import { Summary } from "./components/Summary"
import { BookingForm } from "./components/booking-form.comp"
import { useState } from "react"

export const CreateBookingPage = () => {
  const [passengers, setPassengers] = useState([1])

  const handleAddPassenger = () => {
    setPassengers(passengers => [...passengers, passengers.length+1])
  }

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
          {passengers.map((passenger) => <BookingForm key={passenger} />)}
          <Button variant='contained' onClick={handleAddPassenger}>Add a passenger</Button>
        </Grid>
      </Grid>
    </Container>
  )
}