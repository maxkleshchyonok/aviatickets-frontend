import { PublicRoute } from "app/utils/routing";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { CreateBookingPage } from "./create-booking.page";

export const BookingRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/create-booking' element={<PublicRoute element={CreateBookingPage} />} />
    </Routes>
  )
}