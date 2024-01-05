import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { SignUpPage } from "./sign-up.page";
import { SignInPage } from "./sign-in.page";


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

      {/* DEFAULT */}
      <Route path='*' element={< Navigate to="/auth/signin" />} />
    </Routes>
  );
};

export default AuthRoutes;