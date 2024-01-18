import { Container, Grid } from "@mui/material"
import { BookingTicket } from "./components/BookingTicket"
import { Summary } from "./components/Summary"
import { BookingForm } from "./components/BookingForm"

const CreateBookingPage = () => {
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

export default CreateBookingPage;