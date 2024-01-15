import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { Main } from "./app/main/Main";
import AuthRoutes from "./app/auth/auth.routes";
import { Account } from "./app/account/Account";
import { CreateBookingPage } from "./app/booking/create-booking.page";


// ======= private route ======= //
const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
    return sessionStorage.getItem('access_token') ? (
        <Suspense fallback={<div />}>
            <div><Element /></div>
        </Suspense>
    ) : (
        <Navigate to={"/auth/login"} />
    );
};

// ======= public route ======= //
const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
    <Suspense fallback={<div />}>
        <Element />
    </Suspense>
);

// ======= pages ======= //
// const MainPage = React.lazy(() => import("./app/main/Main"));

export const AppRoutes = () => {
    return (
        <Routes>
            {/* PUBLIC */}
            <Route path={"/flight-search/*"} element={<PublicRoute element={Main} />} />

            {/* PUBLIC */}
            <Route path={"/auth/*"} element={<PublicRoute element={AuthRoutes} />} />

            {/* PRIVATE */}
            <Route path={"/account"} element={<PrivateRoute element={Account} />} />
 
            <Route path={"/booking"} element={<PublicRoute element={CreateBookingPage} />}/>

            {/* DEFAULT */}
            <Route path='*' element={<Navigate to="/flight-search" />} />
        </Routes>
    );
};

export default AppRoutes;