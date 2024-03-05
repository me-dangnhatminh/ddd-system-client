import { lazy } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";

enum RoutesPath {
  HOME = "/home",
  LOGIN = "/login",
}

const routes: RouteObject[] = [
  {
    path: RoutesPath.HOME,
    Component: lazy(() => import("../pages/HomePage")),
  },
  {
    path: RoutesPath.LOGIN,
    Component: lazy(() => import("../pages/LoginPage")),
  },
  {
    path: "*",
    Component: lazy(() => import("../pages/NotFoundPage")),
  },
];

function getRoutes() {
  return routes;
}

export const rootRouter = createBrowserRouter(getRoutes());
