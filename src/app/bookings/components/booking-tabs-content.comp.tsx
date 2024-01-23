import { Stack, StackProps, styled } from "@mui/system";
import { TicketDto } from "app/tickets/types/ticket.dto";
import { useAppDispatch } from "hooks/redux.hooks";
import { useSnackbar } from "notistack";
import { Dispatch, FC, SetStateAction } from "react";
import { createBooking } from "../store/bookings.actions";
import { CreateBookingFormYup } from "../validation-schemas/create-booking-form.schema";
import BookingTabs from "./booking-tabs.comp";
import CreateBookingForm from "./create-booking-form.comp";
import PaymentTabContent from "./payment-tab-content.form";

interface BookingTabsContentProps {
  activeTabIndex: number;
  setActiveTabIndex: Dispatch<SetStateAction<number>>;
  ticket: TicketDto;
}

const StyledStack = styled(Stack)<StackProps>(() => ({
  gridArea: 'bookingTabContent'
}));

const BookingTabsContent: FC<BookingTabsContentProps> = ({ activeTabIndex, setActiveTabIndex, ticket }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const handleBookButtonClick = async (state: CreateBookingFormYup) => {
    const { passengers } = state;
    const { toDestinationRoute, toOriginRoute } = ticket;

    const totalPrice = ticket.price * passengers.length;
    const isRoundTripJourney = Boolean(toOriginRoute);
    const originCity = toDestinationRoute.flights.at(0)!.originCity;
    const destinationCity = toDestinationRoute.flights.at(-1)!.destinationCity;
    const toDestinationFlightIds = toDestinationRoute.flights.map((flight) => flight.id);
    const toOriginFlightIds = isRoundTripJourney ? toOriginRoute!.flights.map((flight) => flight.id) : [];

    const body = {
      price: totalPrice,
      passengers,
      originCity,
      destinationCity,
      toDestinationRoute: toDestinationFlightIds,
      toOriginRoute: toOriginFlightIds
    }

    const response = await dispatch(createBooking({ body }));
    if (response.meta.requestStatus === "rejected") {
      enqueueSnackbar("Booking creation failed", { variant: 'error' });
      return;
    }

    enqueueSnackbar("Booking successfully  created", { variant: "success" });
    setActiveTabIndex(1);
  }

  const handlePayButtonClick = () => { }

  let tabContent = null;

  switch (activeTabIndex) {
    case 0: tabContent = <CreateBookingForm onBookButtonClick={handleBookButtonClick} />; break;
    case 1: tabContent = <PaymentTabContent onPuyButtonClick={handlePayButtonClick} />; break;
  }

  return (
    <StyledStack>
      <BookingTabs activeTabIndex={activeTabIndex} />
      {tabContent}
    </StyledStack>
  )
}

export default BookingTabsContent;