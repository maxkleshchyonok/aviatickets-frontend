import { Dispatch, FC, SetStateAction } from "react";
import { BookingPaymentForm } from "./booking-payment.form";
import BookingTabs from "./booking-tabs.comp";
import CreateBookingForm from "./create-booking-form.comp";

interface BookingTabsContentProps {
  activeTabIndex: number;
  setActiveTabIndex: Dispatch<SetStateAction<number>>;
}

const BookingTabsContent: FC<BookingTabsContentProps> = ({ activeTabIndex, setActiveTabIndex }) => {

  const handleBookButtonClick = () => {
    setActiveTabIndex(1);
  }

  let tabContent = null;

  switch (activeTabIndex) {
    case 0: tabContent = <CreateBookingForm onBookButtonClick={handleBookButtonClick} />; break;
    case 1: tabContent = <BookingPaymentForm />; break;
  }

  return (
    <>
      <BookingTabs activeTabIndex={activeTabIndex} />
      {tabContent}
    </>
  )
}

export default BookingTabsContent;