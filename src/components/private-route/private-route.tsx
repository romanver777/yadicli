import React from "react";
import { Navigate } from "react-router-dom";

type TProps = {
  auth: boolean;
  children: React.ReactNode;
};

const PrivateRoute = ({ auth, children }: TProps): JSX.Element => {
  return <>{auth ? children : <Navigate to="/" />}</>;
};

export default PrivateRoute;
