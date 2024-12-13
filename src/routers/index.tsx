import { Navigate, Routes as ReactRoutes, Route } from "react-router-dom";

import { ReactNode } from "react";
import RequireAuth from "../auth/RequireAuth";
import { RoutesConfig } from "../configs/routers";
import { ROUTES_PATH, ROUTES_TYPES } from "../constants/routers";

const RouteElement = ({
  isPrivate,
  Component,
}: {
  isPrivate?: boolean;
  Component: ReactNode;
}) => {
  return isPrivate ? <RequireAuth>{Component}</RequireAuth> : Component;
};
const Routes = () => {
  return (
    <ReactRoutes>
      {RoutesConfig.map((item) => {
        const { type, layout: Layout } = item;

        if (type === ROUTES_TYPES.PAGE) {
          const { element: Component } = item;
          if (Component)
            return (
              <Route key={item.path} path={item.path} element={<Layout />}>
                <Route
                  index
                  element={
                    <RouteElement
                      isPrivate={item.isPrivate}
                      Component={Component()}
                    />
                  }
                />
              </Route>
            );
        }

        if (type === ROUTES_TYPES.GROUP) {
          const routes = item.routes;

          return (
            <Route key={item.path} element={<Layout />}>
              {routes?.map(({ path, element: Component, isPrivate, key }) => {
                return (
                  <Route
                    key={key}
                    path={path}
                    element={
                      <RouteElement
                        isPrivate={isPrivate}
                        Component={Component()}
                      />
                    }
                  />
                );
              })}
            </Route>
          );
        }
      })}

      <Route path="*" element={<Navigate to={ROUTES_PATH.FOLDER} replace />} />
    </ReactRoutes>
  );
};
export default Routes;
