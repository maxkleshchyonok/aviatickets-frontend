import { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import AuthRoutes from "./app/auth/auth.routes";
import { TicketsModulePagePaths } from "enums/page-paths.enum";
import CenteredLoader from "components/centered-loader.comp";
import React from "react";


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

const BookingsRoutes = React.lazy(() => import('app/bookings'));
const TicketsRoutes = React.lazy(() => import('app/tickets'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/auth/*"} element={<PublicRoute element={AuthRoutes} />} />
      <Route path={"/bookings/*"} element={<PublicRoute element={BookingsRoutes} />} />
      <Route path={"/tickets/*"} element={<PublicRoute element={TicketsRoutes} />} />
      <Route path='*' element={<Navigate to={TicketsModulePagePaths.SearchTickets} />} />
    </Routes>
  );
};

export default AppRoutes;