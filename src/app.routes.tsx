import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { Main } from "./app/main/Main";
import { Account } from "./app/account/Account";
import { BookingPage } from "./app/booking";
import { LocalStorageKeys } from "enums/local-storage-keys.enum";

const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
  return sessionStorage.getItem(LocalStorageKeys.AccessToken) ? (
    <Suspense fallback={<div />}>
      <div>
        <Element />
      </div>
    </Suspense>
  ) : (
    <Navigate to={"/auth/login"} />
  );
};

const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
  <Suspense fallback={<div />}>
    <Element />
  </Suspense>
);

const AuthRoutes = React.lazy(() => import("app/auth"));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={"/flight-search/*"}
        element={<PublicRoute element={Main} />}
      />
      <Route path={"/auth/*"} element={<PublicRoute element={AuthRoutes} />} />
      <Route path={"/account"} element={<PrivateRoute element={Account} />} />
      <Route
        path={"/booking"}
        element={<PublicRoute element={BookingPage} />}
      />
      <Route path="*" element={<Navigate to="/flight-search" />} />
    </Routes>
  );
};

export default AppRoutes;
