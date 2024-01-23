import { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { LocalStorageKeys } from "enums/local-storage-keys.enum";
import { TicketsModulePagePaths } from "enums/page-paths.enum";
import CenteredLoader from "components/centered-loader.comp";
import React from "react";

const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
  return sessionStorage.getItem(LocalStorageKeys.AccessToken) ? (
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

const AuthRoutes = React.lazy(() => import("aviatickets-submodule/auth"));
const TicketsRoutes = React.lazy(() => import("aviatickets-submodule/tickets"));
const BookingsRoutes = React.lazy(() => import("app/bookings"));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/auth/*"} element={<PublicRoute element={AuthRoutes} />} />
      <Route
        path={"/bookings/*"}
        element={<PublicRoute element={BookingsRoutes} />}
      />
      <Route
        path={"/tickets/*"}
        element={<PublicRoute element={TicketsRoutes} />}
      />
      <Route
        path="*"
        element={<Navigate to={TicketsModulePagePaths.SearchTickets} />}
      />
    </Routes>
  );
};

export default AppRoutes;
