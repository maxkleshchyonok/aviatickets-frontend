import { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import AuthRoutes from "./app/auth/auth.routes";
import TicketsRoutes from "app/tickets";
import { TicketsModulePagePaths } from "enums/page-paths.enum";
import { CreateBookingPage } from "app/booking/create-booking.page";
import CenteredLoader from "components/centered-loader.comp";


const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
  return sessionStorage.getItem('access_token') ? (
    <Suspense fallback={<CenteredLoader />}>
      <Element />
    </Suspense>
  ) : (
    <Navigate to={"/auth/login"} />
  );
};

const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
  <Suspense fallback={<CenteredLoader />}>
    <Element />
  </Suspense>
);

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/auth/*"} element={<PublicRoute element={AuthRoutes} />} />
      <Route path={"/booking"} element={<PublicRoute element={CreateBookingPage} />} />
      <Route path={"/tickets/*"} element={<PublicRoute element={TicketsRoutes} />} />
      <Route path='*' element={<Navigate to={TicketsModulePagePaths.SearchTickets} />} />
    </Routes>
  );
};

export default AppRoutes;