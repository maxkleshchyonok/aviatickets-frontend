import { Container, Grid } from "@mui/material"
import { BookingTicket } from "./components/booking-ticket.comp"
import { BookingForm } from "./components/booking-form.comp"
import { Summary } from "./components/summary.comp"
import { BookingTabs } from "./components/booking-tabs.comp"
import { useSelector } from "react-redux"
import { activeTabSelector } from "./store/booking.selectors"
import { BookingPaymentForm } from "./components/booking-payment.form"

export const CreateBookingPage = () => {
  const activeTab = useSelector(activeTabSelector);

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
          <>
            <BookingTabs />
            {activeTab === 0 ? <BookingForm /> : <BookingPaymentForm />}
          </>
        </Grid>
      </Grid>
    </Container>
  )
}