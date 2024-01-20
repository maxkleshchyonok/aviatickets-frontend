import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { Main } from "./app/main/main.page";
import AuthRoutes from "./app/auth/auth.routes";
import { Account } from "./app/account/Account";
import { BookingPage } from "./app/booking";
import { TicketsModulePagePaths } from "enums/page-paths.enum";

const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
    return sessionStorage.getItem('access_token') ? (
        <Suspense fallback={<div />}>
            <div><Element /></div>
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

const TicketsRoutes = React.lazy(() => import('app/tickets'));

export const AppRoutes = () => {
    return (
        <Routes>
            {/* PUBLIC */}
            <Route path={"/flight-search/*"} element={<PublicRoute element={Main} />} />

            {/* PUBLIC */}
            <Route path={"/auth/*"} element={<PublicRoute element={AuthRoutes} />} />

            {/* PRIVATE */}
            <Route path={"/account"} element={<PrivateRoute element={Account} />} />

            <Route path={"/booking"} element={<PublicRoute element={BookingPage} />} />
            <Route path={"/tickets/*"} element={<PublicRoute element={TicketsRoutes} />} />

            <Route path='*' element={<Navigate to={TicketsModulePagePaths.SearchTickets} />} />
        </Routes>
    );
};

export default AppRoutes;