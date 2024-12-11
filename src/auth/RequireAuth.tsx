import Cookies from "js-cookie";
import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES_PATH } from "../constants/routers";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  if (!Cookies.get("accessToken")) {
    return <Navigate to={ROUTES_PATH.SIGN_IN} replace />;
  }

  return children ? children : <Outlet />;
};

export default RequireAuth;
