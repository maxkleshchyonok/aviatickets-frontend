import { Stack, StackProps, styled } from "@mui/system";
import { Dispatch, FC, SetStateAction } from "react";
import BookingTabs from "./booking-tabs.comp";
import CreateBookingForm from "./create-booking-form.comp";
import PaymentTabContent from "./payment-tab-content.form";

interface BookingTabsContentProps {
  activeTabIndex: number;
  setActiveTabIndex: Dispatch<SetStateAction<number>>;
}

const StyledStack = styled(Stack)<StackProps>(() => ({
  gridArea: 'bookingTabContent'
}));

const BookingTabsContent: FC<BookingTabsContentProps> = ({ activeTabIndex, setActiveTabIndex }) => {

  const handleBookButtonClick = () => {
    setActiveTabIndex(1);
  }

  const handlePayButtonClick = () => {}

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