import React from "react";
import { FC, PropsWithChildren, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import BookingsPage from "app/bookings/bookings.page";

const SuspendedRoute: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => (
  <Suspense fallback={<div />} >
    <Element />
  </Suspense>
);

const CreateBookingPage = React.lazy(() => import("app/bookings/create-booking.page"));

const BookingRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/create' element={<SuspendedRoute element={CreateBookingPage} />} />
      //<Route path='/all' element={<SuspendedRoute element={BookingsPage } />} />
    </Routes>
  )
}

export default BookingRoutes;