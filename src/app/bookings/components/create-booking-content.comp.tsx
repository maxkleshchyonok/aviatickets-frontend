import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { activeTabSelector } from "../store/booking.selectors";
import { BookingForm } from "./booking-form.comp";
import { BookingPaymentForm } from "./booking-payment.form";
import { BookingTabs } from "./booking-tabs.comp";
import { BookingTicket } from "./booking-ticket.comp";
import { Summary } from "./summary.comp";

const CreateBookingContent = () => {
  const activeTab = useSelector(activeTabSelector);

  return (
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

  )
}

export default CreateBookingContent;