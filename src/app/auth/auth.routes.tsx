import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { SignUpPage } from "app/auth/sign-up.page";
import { SignInPage } from "app/auth/sign-in.page";
import { ForgotPasswordPage } from "./forgot-password.page";


// ======= public route ======= //
const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
  <Suspense fallback={<div />} >
    <Element />
  </Suspense>
);

const AuthRoutes = () => {
  return (
    <Routes>
      {/*PUBLIC*/}
      < Route path={"/signin"} element={< PublicRoute element={SignInPage} />} />

      {/*PUBLIC*/}
      <Route path={"/signup"} element={< PublicRoute element={SignUpPage} />} />

      {/*PUBLIC*/}
      <Route path={"/forgot"} element={< PublicRoute element={ForgotPasswordPage} />} />

      {/* DEFAULT */}
      <Route path='*' element={< Navigate to="/auth/signin" />} />
    </Routes>
  );
};

export default AuthRoutes;