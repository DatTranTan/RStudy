import { Fragment } from "react";
import { Outlet } from "react-router-dom";

export const PageLayout = () => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};
